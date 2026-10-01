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

---


## 7. Módulo Hard Skills: Active Recall con Evaluación por IA

El módulo de Hard Skills permite practicar Active Recall deliberado sobre temas técnicos avanzados del roadmap Fullstack (arquitectura interna de Node.js, reconciliación Fiber de React, indexación y agregaciones de MongoDB, concurrencia, etc.).

### 7.1 Configuración de Gemini API (`GEMINI_API_KEY`)

Para utilizar el modelo de lenguaje de última generación (`gemini-2.5-flash`), configura tu clave de API de Google Gemini en el archivo de entorno del backend:

1. Crea o edita el archivo `server/.env` (puedes tomar como referencia `server/.env.example`):
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/devcoach-sparring
   GEMINI_API_KEY=tu_gemini_api_key_aqui
   ```
2. Si no dispones de una clave de API inmediata, el sistema cuenta con un motor heurístico offline que permite generar y evaluar desafíos sin interrumpir el flujo de desarrollo local ni las pruebas automatizadas.

### 7.2 Cómo Usar la Interfaz de Hard Skills

1. **Selección del Tema:** En la sección superior del módulo, selecciona un tema pendiente del menú desplegable o haz clic en **"Cargar tema prioritario"**. El sistema consultará la cola priorizada del algoritmo SRS.
2. **Visualización del Desafío:** La IA formulará un reto incisivo:
   - **Tópicos Teóricos:** Dilemas sobre arquitectura interna, protocolos, fases del event loop, gestión de memoria o trade-offs (sin preguntas triviales de memorización).
   - **Tópicos Prácticos:** Escenarios reales de cuellos de botella en producción, diseño de componentes de alto rendimiento o optimización de flujos asíncronos.
3. **Área de Redacción Técnica:** Escribe tu solución en el editor monoespaciado. Puedes redactar fragmentos de código, explicaciones paso a paso y justificación de trade-offs.
4. **Evaluación Senior:** Presiona **"Evaluar Solución"**. El Senior Evaluator analizará tu respuesta y mostrará:
   - **Badge de Score (1 a 5):** Nivel de dominio técnico demostrado.
   - **Retroalimentación Técnica Directa:** Dictamen sin condescendencia sobre la precisión de tu respuesta.
   - **Fortalezas Identificadas:** Puntos altos y precisiones arquitectónicas correctas.
   - **Puntos Ciegos / Trade-offs Omitidos:** Aspectos de escalabilidad, límites de recursos o casos de borde que omitiste.
   - **Próximo Repaso SRS:** Fecha reprogramada automáticamente y etapa en la que se encuentra el tópico.

### 7.3 Qué Formato de Respuesta Espera la IA para Dar un 5/5

El Evaluador Técnico Senior utiliza criterios estrictos equivalentes a entrevistas para Staff / Principal Engineer. Para obtener una calificación de **5/5**, tu respuesta debe cumplir:

- **Justificación del "Por Qué":** No basta con decir *cómo* se soluciona; debes explicar qué sucede a nivel de runtime o bajo el capó (ej. qué fases de libuv intervienen, cómo se serializa el trabajo o qué estructuras de datos internas se ven afectadas).
- **Análisis Explícito de Trade-offs:** Compara tu enfoque con alternativas viables explicando el costo o compromiso asumido (ej. latencia de red vs uso de memoria heap, simplicidad de código vs throughput, consistencia eventual vs bloqueo transaccional).
- **Consideración de Casos Límite y Producción:** Menciona cómo se comporta la solución ante alta concurrencia, degradación de servicios downstream, fugas de memoria o backpressure.
- **Claridad y Terminología Precisa:** Emplea términos técnicos estándar de la industria sin rodeos ni ambigüedades.

---

## 8. Módulo Soft Skills: Sparring por Voz & Consultoría Técnica

El módulo de **Soft Skills** permite entrenar la defensa verbal de decisiones de ingeniería, negociación de deuda técnica y trade-offs ante stakeholders difíciles (Tech Leads escépticos, Product Managers obsesionados con fechas o Clientes no técnicos).

### 8.1 Cómo Conceder Permisos de Micrófono en el Navegador

El simulador utiliza la **Web Speech API** nativa (`SpeechRecognition` / `webkitSpeechRecognition`) para transcribir tu voz en tiempo real:

1. Al presionar por primera vez el botón de micrófono en [http://localhost:5173](http://localhost:5173), el navegador mostrará un diálogo emergente: *"¿Permitir que localhost use el micrófono?"*.
2. Haz clic en **"Permitir"** (o *"Permitir mientras se usa el sitio"*).
3. **Solución si denegaste el permiso accidentalmente:**
   - Haz clic en el ícono de candado o configuración a la izquierda de la barra de direcciones URL del navegador.
   - En la sección **Micrófono**, cambia el selector de "Bloqueado" a **"Permitir"**.
   - Recarga la pestaña.
4. **Fallback Manual por Texto:** Si tu sistema o navegador no soporta captura de micrófono (ej. navegadores antiguos o entornos WSL2 sin servidor PulseAudio configurado), puedes redactar tu defensa en el cuadro de texto. La simulación y evaluación funcionan con paridad total del 100%.

### 8.2 Cómo Usar el Simulador de Sparring

1. **Acceder a la Pestaña:** En la parte superior de la aplicación, haz clic en la pestaña **"Soft Skills (Voz & Consultoría)"**.
2. **Seleccionar Tema o Escenario:** Elige el tema que deseas defender (o utiliza el tema priorizado por el motor SRS).
3. **Iniciar Sparring:** Presiona **"Iniciar Sparring"**. La IA adoptará un rol de stakeholder y planteará un escenario conflictivo inicial (ej. exigir recortar tests para entregar antes, o cuestionar la necesidad de redundancia).
4. **Escucha y Réplica por Voz:**
   - Si la síntesis de voz está habilitada (ícono de altavoz), escucharás la pregunta hablada del cliente.
   - Presiona el **botón de micrófono (morado)** para comenzar a hablar. El botón parpadeará en rojo indicando grabación activa.
   - Habla con firmeza y claridad. Verás tu transcripción reflejada en tiempo real.
   - Presiona el botón de envío para remitir tu argumento.
5. **Dinámica de 3 Turnos:**
   - **Turno 1 y 2 (Intermedios):** El stakeholder contraatacará con objeciones financieras o de tiempo ("¿Y si la demanda se triplica?", "¿Por qué no usamos una solución más barata?").
   - **Turno 3 (Final):** Tras tu tercera intervención, la IA convoca al Evaluador Asertivo para generar el veredicto formal.

### 8.3 Qué Evalúa el Simulador de Consultoría

El veredicto final desglosa tu desempeño en tres dimensiones críticas para roles Senior y Staff:

1. **Claridad de Negocio (Business Clarity):**
   - Evalúa tu capacidad para traducir métricas técnicas (latencia, consistencia, memoria) a impacto directo de negocio (SLA, facturación, retención, costos de nube).
2. **Defensa de Trade-Offs (Trade-Off Defense):**
   - Mide si fuiste honesto sobre lo que se sacrifica (ej. tiempo de entrega vs riesgo de regresión) y si ofreciste alternativas viables (ej. canary release, automatización del camino crítico).
3. **Asertividad & Manejo de Presión (Assertiveness):**
   - Califica del 1 al 5 si mantuviste tu criterio profesional ante la insistencia del cliente sin ser agresivo ni tampoco capitular aceptando deuda técnica crítica.
4. **Puntuación Global (1 a 5) y Reprogramación SRS:**
   - Tu puntaje actualiza automáticamente la próxima fecha de repaso del tema en el algoritmo SRS y queda registrado en `SessionLog` de MongoDB.
