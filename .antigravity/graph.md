# Grafo de Implementación: DevCoach Sparring

## Grafo de Dependencias

[US-01: Scaffolding, Playwright & Mongo]
└──> [US-02: Schemas Mongo & Motor SRS]
├──> [US-03: Módulo Hard Skills (Roadmap Active Recall)]
│ └──> [US-05: Dashboard & Cola Diaria de Práctica]
└──> [US-04: Módulo Soft Skills (Defensa por Voz con Gemini)]
└──> [US-05: Dashboard & Cola Diaria de Práctica]
└──> [US-06: Seed de 30 Desafíos & E2E Final]

---

### [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)

- **Dependencias:** Ninguna
- **Criterios de Aceptación (AC):**
  1. Monorepo configurado con `/client` (Vite, React, Tailwind) y `/server` (Express, Mongoose).
  2. Playwright configurado en `/tests/e2e/smoke.spec.js` validando que la app carga en puerto 5173.
  3. Vitest y Supertest configurados en el server con prueba de salud `/api/health` conectada a MongoDB.
  4. Script raíz `npm test` corre unit tests y `npm run test:e2e` corre Playwright.

### [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)

- **Dependencias:** US-01
- **Criterios de Aceptación (AC):**
  1. Schemas: `Topic` (id, title, category, type: 'theory'|'practice', srsStage, easeFactor, intervalDays, nextReviewAt) y `SessionLog` (topicId, score, feedback, userResponse).
  2. Utilidad pura `srsCalculator.js` con tests unitarios al 100% de cobertura.
  3. Endpoints REST: `GET /api/topics/due` (obtiene cola de repaso) y `POST /api/topics/review` (registra score 1-5 y reprograma fecha).

### [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico

- **Dependencias:** US-02
- **Criterios de Aceptación (AC):**
  1. Integración con SDK Gemini (`@google/genai`) para generar preguntas de active recall basadas en los temas de roadmap.sh/fullstack.
  2. UI en React con selector de tema, visor de problema/pregunta, editor para redactar justificación o código React, y botón "Evaluar".
  3. Evaluación por IA: análisis de profundidad técnica, trade-offs explicados, score (1-5) y retroalimentación directa sin condescendencia.

### [US-04] Módulo Soft Skills: Sparring por Voz (Web Speech API + Gemini)

- **Dependencias:** US-02
- **Criterios de Aceptación (AC):**
  1. Hook `useVoiceInteraction` en React usando Web Speech API nativa para grabar voz del usuario y sintetizar la réplica del cliente/tech lead.
  2. Backend: Endpoint con prompt especializado que asume el rol de cliente no técnico o PM exigente que refuta las decisiones técnicas.
  3. Intercambio de 3 turnos conversacionales con veredicto final: evalúa si defendiste con argumentos de negocio, asertividad y trade-offs.

### [US-05] Dashboard Operativo y Acoplamiento de Habilidades

- **Dependencias:** US-03, US-04
- **Criterios de Aceptación (AC):**
  1. Dashboard principal simple: número de repasos pendientes para hoy y lista de temas críticos (score < 3).
  2. Botón "Entrenar Ahora" que prioriza el tema técnico más urgente y sugiere el escenario de voz asociado si ya se alcanzó nivel suficiente en la teoría.
  3. Test E2E en Playwright que simula completar una tarjeta de práctica y comprueba que desaparezca de la cola de hoy.

### [US-06] Seed Senior del Roadmap y Validación E2E Total

- **Dependencias:** US-05
- **Criterios de Aceptación (AC):**
  1. Script `npm run seed` con al menos 25 tópicos del roadmap.sh listos para entrenar (teóricos y prácticos en React/Node/Mongo).
  2. Suite completa de Playwright corriendo en verde sin advertencias.
  3. Ejecución de `document-user-guide` y `document-tech-specs` dejando el repo listo para uso diario.
