# Arquitectura Técnica del Sistema: DevCoach Sparring

Este documento describe la arquitectura modular, contratos de API, estrategia de persistencia y flujo de datos de DevCoach Sparring conforme avanza su grafo de desarrollo.

---

## 1. Topología del Monorepo

El repositorio está organizado como un monorepo NPM con separación estricta de responsabilidades:

```text
devcoach-sparring/
├── client/                     # Frontend SPA en Vite + React 18 + Tailwind CSS
│   ├── src/
│   │   ├── App.jsx             # Shell principal con monitoreo de API
│   │   ├── main.jsx            # Entry point
│   │   └── index.css           # Estilos base y tokens Tailwind
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── server/                     # Backend API en Node.js + Express + Mongoose
│   ├── src/
│   │   ├── app.js              # Configuración de Express, middlewares y rutas
│   │   ├── server.js           # Bootstrap del servidor HTTP y conexión DB
│   │   ├── db.js               # Conexión defensiva a MongoDB
│   │   └── routes/
│   │       └── health.js       # Endpoint de diagnóstico y salud
│   ├── tests/
│   │   └── health.test.js      # Pruebas de integración con Supertest & MongoMemoryServer
│   └── package.json
├── tests/
│   └── e2e/
│       └── smoke.spec.js       # Validación End-to-End con Playwright
├── docs/                       # Documentación técnica y guías
├── tickets/                    # Registro formal de historias de usuario y evidencias
├── playwright.config.js        # Orquestación de webServer y navegadores E2E
└── package.json                # Workspaces de NPM y scripts concurrentes
```

---

## 2. Contratos de API

### 2.1 `GET /api/health`

Comprueba el estado del servidor y la conectividad activa con MongoDB.

- **Método:** `GET`
- **Ruta:** `/api/health`
- **Headers:** `Accept: application/json`

#### Códigos de Respuesta

| Código HTTP | Escenario | Payload de Ejemplo |
| :--- | :--- | :--- |
| `200 OK` | Servidor en línea y MongoDB conectado | `{"status": "ok", "timestamp": "2026-10-01T02:50:00.000Z", "services": {"database": "connected"}}` |
| `503 Service Unavailable` | Servidor en línea pero MongoDB desconectado / inalcanzable | `{"status": "degraded", "timestamp": "2026-10-01T02:50:00.000Z", "services": {"database": "disconnected"}}` |

### 2.2 `GET /api/topics/due`

Obtiene la cola de temas vencidos para repetición espaciada (`nextReviewAt <= Date.now()`), priorizando los temas más críticos (menor promedio histórico de score) y con mayor atraso temporal.

- **Método:** `GET`
- **Ruta:** `/api/topics/due`
- **Headers:** `Accept: application/json`

#### Códigos de Respuesta

| Código HTTP | Escenario | Payload de Ejemplo |
| :--- | :--- | :--- |
| `200 OK` | Consulta exitosa (array de temas) | `[{"_id": "...", "title": "React Fiber", "category": "hard_skill", "type": "theory", "srsStage": 0, "nextReviewAt": "..."}]` |
| `500 Internal Server Error` | Fallo de base de datos | `{"error": "Internal Server Error"}` |

### 2.3 `POST /api/topics/review`

Registra el resultado de una sesión de Active Recall o defensa por voz, recomputa el estado SRS con SM-2 adaptado y persiste el intento en el historial.

- **Método:** `POST`
- **Ruta:** `/api/topics/review`
- **Headers:** `Content-Type: application/json`
- **Body:**
  ```json
  {
    "topicId": "651f8...",
    "score": 4,
    "userInput": "Explicación de Fiber reconciler...",
    "aiFeedback": "Buena argumentación técnica."
  }
  ```

#### Códigos de Respuesta

| Código HTTP | Escenario | Payload de Ejemplo |
| :--- | :--- | :--- |
| `200 OK` | Revisión procesada y recalculada | `{"message": "Review recorded successfully", "topic": { ... }}` |
| `400 Bad Request` | Faltan campos requeridos o score inválido | `{"error": "score must be a number between 1 and 5"}` |
| `404 Not Found` | Topic inexistente | `{"error": "Topic not found"}` |
| `500 Internal Server Error` | Error al persistir | `{"error": "Internal Server Error"}` |

---

## 3. Modelo de Datos (Mongoose Schemas)

### Modelo `Topic` (`server/src/models/Topic.js`)

```typescript
interface IReviewHistory {
  score: number;          // 1 a 5
  userInput: string;      // Respuesta o transcripción del usuario
  aiFeedback: string;     // Feedback emitido por Gemini
  reviewedAt: Date;       // Timestamp del repaso
}

interface ITopic {
  title: string;
  category: 'hard_skill' | 'soft_skill';
  type: 'theory' | 'practice';
  srsStage: number;       // Etapa SRS (0: nuevo/reseteado, 1, 2, ...)
  easeFactor: number;     // Multiplicador de dificultad (default: 2.5, min: 1.3)
  intervalDays: number;   // Días hasta el próximo repaso
  nextReviewAt: Date;     // Fecha programada para la siguiente revisión (Indexado)
  history: IReviewHistory[]; // Subdocumentos embebidos
  createdAt: Date;
  updatedAt: Date;
}
```

---

## 4. Diagramas de Flujo y Arquitectura

### 4.1 Máquina de Estados del Motor Algorítmico SRS (SM-2 Adaptado)

```mermaid
stateDiagram-v2
    [*] --> Stage0: Tema Creado (Stage 0, EF 2.5, Interval 0d)

    state Stage0 {
        [*] --> PendingDue: nextReviewAt <= now
    }

    PendingDue --> Stage0: Score 1 o 2 (Fallo / Duda severa)\n[Stage=0, Interval=1d, EF disminuye (min 1.3)]
    PendingDue --> Stage1: Score 3 (Aprobado raspado)\n[Stage=1, Interval=3d, EF ajustado]
    PendingDue --> Stage1: Score 4 o 5 (Buen rendimiento / Dominio)\n[Stage=1, Interval=1d, EF ajustado]

    state Stage1 {
        [*] --> InReviewStage1
    }

    InReviewStage1 --> Stage0: Score 1 o 2 (Fallo)\n[Reset a Stage=0, Interval=1d]
    InReviewStage1 --> Stage1: Score 3\n[Stage=1, Interval=3d]
    InReviewStage1 --> Stage2: Score 4 o 5\n[Stage=2, Interval=6d]

    state Stage2_Plus {
        [*] --> InReviewAdvanced
    }

    Stage2 --> Stage2_Plus
    InReviewAdvanced --> Stage0: Score 1 o 2 (Fallo)\n[Reset a Stage=0, Interval=1d]
    InReviewAdvanced --> Stage2_Plus: Score 3\n[Stage actual, Interval=3d]
    InReviewAdvanced --> Stage2_Plus: Score 4 o 5\n[Stage=Stage+1, Interval = round(Interval * EF)]
```

### 4.2 Flujo de Arranque y Healthcheck

```mermaid
sequenceDiagram
    autonumber
    actor Usuario
    participant Client as React SPA (Port 5173)
    participant Server as Express API (Port 5000)
    participant Mongo as MongoDB Instance

    Usuario->>Client: Carga en navegador (http://localhost:5173)
    Client->>Server: GET /api/health
    Server->>Mongo: Inspecciona mongoose.connection.readyState
    alt Conexión establecida (readyState == 1)
        Mongo-->>Server: Connected
        Server-->>Client: 200 OK { status: "ok", services: { database: "connected" } }
        Client-->>Usuario: Muestra indicador verde "API: ok"
    else Sin conexión (readyState != 1)
        Mongo-->>Server: Disconnected
        Server-->>Client: 503 Service Unavailable { status: "degraded", services: { database: "disconnected" } }
        Client-->>Usuario: Muestra indicador ámbar "API: degraded"
    end
```

### 4.3 Harness de Testing y E2E Playwright

```mermaid
graph TD
    A[npm test / npm run test:e2e] --> B[Vitest + Supertest]
    A --> C[Playwright Test Runner]

    subgraph "Backend Harness"
        B --> D[MongoMemoryServer (In-Memory Mongo)]
        B --> E[Express App (Supertest)]
    end

    subgraph "E2E Harness (Playwright)"
        C --> F[Orquesta webServer: server (port 5000)]
        C --> G[Orquesta webServer: client (port 5173)]
        C --> H[Chromium Browser Context]
        H --> G
        G --> F
    end
```

---

## 5. Evolución Hacia las Siguientes Historias

- **US-03 & US-04:** Conectarán los endpoints de Active Recall y Sparring por voz con el SDK `@google/genai` y la Web Speech API nativa.
- **US-05:** Presentará la cola `/api/topics/due` en el Dashboard de React y enlazará las sesiones con `POST /api/topics/review`.
