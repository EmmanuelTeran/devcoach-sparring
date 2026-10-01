# Guía de Usuario: DevCoach Sparring

Bienvenido a **DevCoach Sparring**, la plataforma de entrenamiento deliberado para desarrolladores Fullstack (Hard & Soft Skills) orientada a dominar Active Recall y defensa técnica por voz.

---

## 1. Requisitos Previos

- **Node.js**: v20+ o v24+
- **NPM**: v10+
- **MongoDB** (opcional para desarrollo básico / healthcheck degraded): `mongodb://localhost:27017/devcoach`

---

## 2. Instalación de Dependencias

Ejecuta en la raíz del proyecto:

```bash
npm install
```

Para asegurar las librerías necesarias de Playwright si ejecutas pruebas E2E:

```bash
npm run test:e2e
```

---

## 3. Cómo Arrancar la Aplicación en Local

Puedes levantar tanto el backend Express como el frontend Vite en paralelo con un único comando:

```bash
npm run dev
```

Esto levantará concurrentemente:
- **Frontend (Vite + React + Tailwind):** [http://localhost:5173](http://localhost:5173)
- **Backend (Node.js + Express):** [http://localhost:5000](http://localhost:5000)

Si deseas arrancarlos por separado:
- Backend: `npm run dev:server` (o `npm --workspace=server run dev`)
- Frontend: `npm run dev:client` (o `npm --workspace=client run dev`)

---

## 4. Cómo Verificar el Estado y la Salud del Sistema

### 4.1 Comprobación Rápida de Salud (Healthcheck)

Accede o haz una petición al endpoint de salud:

```bash
curl http://localhost:5000/api/health
```

Respuesta esperada:
- Si MongoDB está conectado:
  ```json
  {
    "status": "ok",
    "timestamp": "2026-10-01T...",
    "services": {
      "database": "connected"
    }
  }
  ```
- Si MongoDB está apagado:
  ```json
  {
    "status": "degraded",
    "timestamp": "2026-10-01T...",
    "services": {
      "database": "disconnected"
    }
  }
  ```

En el frontend, el pill superior derecho indicará dinámicamente el estado de la API (`ok`, `degraded` o `offline`).

---

## 5. Batería de Pruebas Automatizadas

- **Pruebas Unitarias e Integración (Vitest + Supertest + MongoMemoryServer):**
  ```bash
  npm test
  ```
- **Pruebas End-to-End (Playwright en Chromium):**
  ```bash
  npm run test:e2e
  ```
- **Ejecutar toda la suite combinada:**
  ```bash
  npm run test:all
  ```

---

## 6. Motor SRS y Flujo de Repaso Espaciado (SM-2 Adaptado)

DevCoach Sparring implementa una versión adaptada del algoritmo SuperMemo 2 (SM-2) para programar sesiones de Active Recall técnico y defensa por voz.

### 6.1 Lógica de Calificación y Estados

| Score | Significado | Comportamiento del Motor SRS |
| :--- | :--- | :--- |
| **1** | Fallo rotundo / Sin recuerdo | Resetea `srsStage = 0`, `intervalDays = 1` día, penaliza el `easeFactor` (mínimo 1.3). |
| **2** | Duda severa / Respuesta errónea | Resetea `srsStage = 0`, `intervalDays = 1` día, penaliza el `easeFactor`. |
| **3** | Aprobado raspado / Con dificultad | Mantiene intervalo corto (`intervalDays = 3` días), avanza etapa inicial o mantiene ritmo. |
| **4** | Buen desempeño / Recuerda con precisión | En etapa 0 pasa a 1 día; en etapa 1 pasa a 6 días; en etapa >= 2 multiplica exponencialmente por `easeFactor`. |
| **5** | Dominio absoluto / Defensa impecable | Escala exponencialmente e incrementa el `easeFactor` para espaciar revisiones futuras más rápidamente. |

- El **`easeFactor`** inicia por defecto en `2.5` y nunca desciende por debajo de `1.3`.

### 6.2 Pruebas Manuales con cURL

#### Consultar Temas Pendientes de Repaso
Devuelve la lista ordenada por prioridad (menor score histórico promedio primero, seguido por el mayor retraso en fecha):

```bash
curl http://localhost:5000/api/topics/due
```

#### Registrar una Revisión de Tema
Envía el resultado de la sesión de práctica o sparring para reprogramar la siguiente fecha de revisión (`nextReviewAt`) y registrar el historial:

```bash
curl -X POST http://localhost:5000/api/topics/review \
  -H "Content-Type: application/json" \
  -d '{
    "topicId": "<TOPIC_ID_MONGO>",
    "score": 4,
    "userInput": "Explicación de reconciliación en React con Fiber y diffing heurístico.",
    "aiFeedback": "Análisis sólido de complejidad O(n) y comparación por tipo y key."
  }'
```

Respuesta esperada:
```json
{
  "message": "Review recorded successfully",
  "topic": {
    "_id": "<TOPIC_ID_MONGO>",
    "title": "React Fiber & Reconciliation",
    "category": "hard_skill",
    "type": "theory",
    "srsStage": 1,
    "easeFactor": 2.5,
    "intervalDays": 1,
    "nextReviewAt": "2026-10-02T...",
    "history": [
      {
        "score": 4,
        "userInput": "Explicación de reconciliación en React con Fiber y diffing heurístico.",
        "aiFeedback": "Análisis sólido de complejidad O(n) y comparación por tipo y key.",
        "reviewedAt": "2026-10-01T..."
      }
    ]
  }
}
```
