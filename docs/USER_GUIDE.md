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

## 3. Cómo Arrancar la Aplicación en Local (Quickstart Definitivo)

### 3.1 Poblado Inicial de la Base de Datos (Seeding Idempotente)

Para poblar la base de datos con los **30 temas clave Mid-to-Senior** (15 Hard Skills y 15 Soft Skills sin HTML/CSS vanilla):

```bash
npm run seed
```

Este script es completamente **idempotente**: utiliza operaciones `bulkWrite` con `$setOnInsert` por `title`. Puedes ejecutarlo en cualquier momento sin riesgo de duplicar temas ni sobreescribir el historial de revisiones ni etapas SRS acumuladas.

### 3.2 Levantamiento Concurrente

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

## 4. Protocolo Diario Recomendado: 20 Minutos de Sparring

Para maximizar la curva de retención espaciada (SM-2) y desarrollar agilidad mental ante entrevistas técnicas y negociaciones con clientes, sugerimos seguir la siguiente rutina matutina de **20 minutos**:

```text
┌────────────────────────────────────────────────────────────────────────┐
│               RUTINA DIARIA DE ENTRENAMIENTO (20 MIN)                  │
├──────────────┬─────────────────────────────┬───────────────────────────┤
│ Minutos 0-2  │ Revisión en Dashboard       │ Inspección de métricas    │
│              │ GET /api/dashboard/summary  │ dueCount y Áreas Críticas │
├──────────────┼─────────────────────────────┼───────────────────────────┤
│ Minutos 2-10 │ Active Recall Hard Skills   │ Reto Técnico con IA       │
│ (8 minutos)  │ (1 o 2 temas prioritarios)  │ Código, internals libuv,  │
│              │                             │ tradeoffs y límites       │
├──────────────┼─────────────────────────────┼───────────────────────────┤
│ Minutos 10-18│ Sparring de Voz Soft Skills │ 3 turnos conversacionales │
│ (8 minutos)  │ (1 simulación con cliente)  │ Defensa verbal, impacto   │
│              │                             │ de negocio y asertividad  │
├──────────────┼─────────────────────────────┼───────────────────────────┤
│ Minutos 18-20│ Análisis de Veredictos      │ Lectura de missing        │
│ (2 minutos)  │ y Verificación SRS          │ tradeoffs y reprogramación│
└──────────────┴─────────────────────────────┴───────────────────────────┘
```

1. **Minutos 0 a 2: Diagnóstico en Dashboard:** Entra a [http://localhost:5173](http://localhost:5173). Revisa el contador de temas pendientes de hoy (`dueCount`) y si existen áreas críticas pendientes de resolver (`Score < 3`).
2. **Minutos 2 a 10: Bloque Hard Skills (Active Recall Técnico):** Presiona **"Entrenar Ahora"** o dirígete a la pestaña **Hard Skills**. Escribe tu solución detallando el funcionamiento interno del runtime, trade-offs de arquitectura y consideraciones de concurrencia.
3. **Minutos 10 a 18: Bloque Soft Skills (Defensa Verbal por Voz):** Dirígete a **Soft Skills (Voz & Consultoría)**. Activa el micrófono y enfrenta al stakeholder (Tech Lead o PM). Defiende con firmeza técnica tus decisiones y tradúcelas a impacto de negocio sin capitular.
4. **Minutos 18 a 20: Cierre y Reprogramación:** Lee con atención los trade-offs omitidos y sugerencias de asertividad arrojados por el evaluador. El motor SRS reprogramará automáticamente las fechas óptimas de repaso.

---

## 5. Cómo Verificar el Estado y la Salud del Sistema

### 5.1 Comprobación Rápida de Salud (Healthcheck)

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

## 6. Batería de Pruebas Automatizadas

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

## 7. Motor SRS y Flujo de Repaso Espaciado (SM-2 Adaptado)

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


## 8. Módulo Hard Skills: Active Recall con Evaluación por IA

El módulo de Hard Skills permite practicar Active Recall deliberado sobre temas técnicos avanzados del roadmap Fullstack (arquitectura interna de Node.js, reconciliación Fiber de React, indexación y agregaciones de MongoDB, concurrencia, etc.).

### 8.1 Configuración de Gemini API (`GEMINI_API_KEY`)

Para utilizar el modelo de lenguaje de última generación (`gemini-2.5-flash`), configura tu clave de API de Google Gemini en el archivo de entorno del backend:

1. Crea o edita el archivo `server/.env` (puedes tomar como referencia `server/.env.example`):
   ```bash
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/devcoach-sparring
   GEMINI_API_KEY=tu_gemini_api_key_aqui
   ```
2. Si no dispones de una clave de API inmediata, el sistema cuenta con un motor heurístico offline que permite generar y evaluar desafíos sin interrumpir el flujo de desarrollo local ni las pruebas automatizadas.

### 8.2 Cómo Usar la Interfaz de Hard Skills

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

### 8.3 Qué Formato de Respuesta Espera la IA para Dar un 5/5

El Evaluador Técnico Senior utiliza criterios estrictos equivalentes a entrevistas para Staff / Principal Engineer. Para obtener una calificación de **5/5**, tu respuesta debe cumplir:

- **Justificación del "Por Qué":** No basta con decir *cómo* se soluciona; debes explicar qué sucede a nivel de runtime o bajo el capó (ej. qué fases de libuv intervienen, cómo se serializa el trabajo o qué estructuras de datos internas se ven afectadas).
- **Análisis Explícito de Trade-offs:** Compara tu enfoque con alternativas viables explicando el costo o compromiso asumido (ej. latencia de red vs uso de memoria heap, simplicidad de código vs throughput, consistencia eventual vs bloqueo transaccional).
- **Consideración de Casos Límite y Producción:** Menciona cómo se comporta la solución ante alta concurrencia, degradación de servicios downstream, fugas de memoria o backpressure.
- **Claridad y Terminología Precisa:** Emplea términos técnicos estándar de la industria sin rodeos ni ambigüedades.

---

## 9. Módulo Soft Skills: Sparring por Voz & Consultoría Técnica

El módulo de **Soft Skills** permite entrenar la defensa verbal de decisiones de ingeniería, negociación de deuda técnica y trade-offs ante stakeholders difíciles (Tech Leads escépticos, Product Managers obsesionados con fechas o Clientes no técnicos).

### 9.1 Cómo Conceder Permisos de Micrófono en el Navegador

El simulador utiliza la **Web Speech API** nativa (`SpeechRecognition` / `webkitSpeechRecognition`) para transcribir tu voz en tiempo real:

1. Al presionar por primera vez el botón de micrófono en [http://localhost:5173](http://localhost:5173), el navegador mostrará un diálogo emergente: *"¿Permitir que localhost use el micrófono?"*.
2. Haz clic en **"Permitir"** (o *"Permitir mientras se usa el sitio"*).
3. **Solución si denegaste el permiso accidentalmente:**
   - Haz clic en el ícono de candado o configuración a la izquierda de la barra de direcciones URL del navegador.
   - En la sección **Micrófono**, cambia el selector de "Bloqueado" a **"Permitir"**.
   - Recarga la pestaña.
4. **Fallback Manual por Texto:** Si tu sistema o navegador no soporta captura de micrófono (ej. navegadores antiguos o entornos WSL2 sin servidor PulseAudio configurado), puedes redactar tu defensa en el cuadro de texto. La simulación y evaluación funcionan con paridad total del 100%.

### 9.2 Cómo Usar el Simulador de Sparring

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

### 9.3 Qué Evalúa el Simulador de Consultoría

El veredicto final desglosa tu desempeño en tres dimensiones críticas para roles Senior y Staff:

1. **Claridad de Negocio (Business Clarity):**
   - Evalúa tu capacidad para traducir métricas técnicas (latencia, consistencia, memoria) a impacto directo de negocio (SLA, facturación, retención, costos de nube).
2. **Defensa de Trade-Offs (Trade-Off Defense):**
   - Mide si fuiste honesto sobre lo que se sacrifica (ej. tiempo de entrega vs riesgo de regresión) y si ofreciste alternativas viables (ej. canary release, automatización del camino crítico).
3. **Asertividad & Manejo de Presión (Assertiveness):**
   - Califica del 1 al 5 si mantuviste tu criterio profesional ante la insistencia del cliente sin ser agresivo ni tampoco capitular aceptando deuda técnica crítica.
4. **Puntuación Global (1 a 5) y Reprogramación SRS:**
   - Tu puntaje actualiza automáticamente la próxima fecha de repaso del tema en el algoritmo SRS y queda registrado en `SessionLog` de MongoDB.

---

## 10. Panel de Control y Dashboard Operativo

El **Dashboard** (`GET /api/dashboard/summary`) es el centro de mando diario de DevCoach Sparring. Consolida en una sola pantalla el estado de retención y la priorización acoplada de práctica técnica y verbal.

### 10.1 Interpretación de Métricas Rápidas

1. **Pendientes de Hoy (`dueCount`):**
   - Número total de temas cuya fecha calculada por el algoritmo SRS ha vencido (`nextReviewAt <= ahora`). Si este contador está en 0, tu retención espaciada está al día.
2. **Desglose Hard Skills vs Soft Skills (`dueHardSkills` / `dueSoftSkills`):**
   - **Hard Skills:** Cantidad de retos de active recall conceptual o diseño técnico que requieren revisión para evitar la curva del olvido.
   - **Soft Skills:** Simulaciones conversacionales de voz pendientes para poner a prueba tu capacidad de argumentación y defensa ante stakeholders.

### 10.2 Priorización Automática: Botón "Entrenar Ahora" (`recommendedNext`)

El botón principal **"Entrenar Ahora"** utiliza un algoritmo de acoplamiento pedagógico inteligente:

- **Regla de Base Teórica Primero:** Si el tema más urgente cronológicamente en la cola de hoy es una simulación de voz (Soft Skill), pero su contraparte técnica (o temas de su misma área conceptual) tiene una calificación deficiente (< 3) o no ha sido consolidada, el sistema **priorizará automáticamente el reto de Hard Skill correspondiente**.
  > *Fundamento pedagógico:* No es posible defender con solidez y asertividad una arquitectura ante un Tech Lead si no se dominan primero los conceptos de bajo nivel, latencias y trade-offs teóricos.
- **Navegación Fluida:** Al presionar "Entrenar Ahora", la interfaz te transfiere inmediatamente a la pestaña correspondiente (`Hard Skills` o `Soft Skills`) con el tema objetivo precargado en el selector para comenzar la sesión sin fricción.

### 10.3 Gestión y Limpieza de Áreas Críticas

La sección **"Áreas Críticas (Score < 3)"** lista de forma visible todos los temas en los que tu última sesión registrada obtuvo una calificación deficiente (Score 1 o 2):

- **Orden de Severidad:** Los temas se ordenan ascendentemente por calificación (Score 1 con badge rojo primero, luego Score 2 con badge ámbar).
- **Botón "Repasar":** Cada fila dispone de un botón directo de repaso que carga el tema problemático en el entrenador correspondiente.
- **Cómo Limpiar un Área Crítica:** Para que un tema desaparezca de la lista de áreas críticas, debes iniciar un nuevo entrenamiento (sea reto técnico o sesión de sparring) y obtener una calificación de **3 o superior** (≥ 3). Una vez evaluado con éxito, el sistema actualizará su historial y se retirará automáticamente de la lista crítica.

