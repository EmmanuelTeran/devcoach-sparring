# [US-07] Niveles de Progresión y Andamiaje Pedagógico (Scaffolding)

- **Estado:** En Progreso
- **Rama:** `feature/US-07-progression-levels-and-scaffolding`
- **Fecha de Inicio:** 2026-10-02
- **Fecha de Cierre:** -

## 1. Descripción

Incorporar niveles de progresión pedagógica (Junior / Mid / Senior) al modelo de tópicos y a la experiencia de entrenamiento. Se añade un endpoint de pistas pedagógicas (`/hint`) que usa Gemini con rol de tutor socrático sin revelar respuestas directas, filtro de nivel en el dashboard, re-seed estratificado con distribución temática por nivel, selector visual de nivel en Dashboard y HardSkillTrainer, y botón "💡 Dame una pista / Modelo Mental" en el entrenador de hard skills.

## 2. Criterios de Aceptación (AC)

- [ ] AC-1: `server/src/models/Topic.js` actualizado con campo `level`: enum `['junior', 'mid', 'senior']`, default `'junior'`.
- [ ] AC-2: Endpoint `POST /api/practice/hard-skill/hint` que recibe `{ topicId, challenge }`, consulta Gemini con rol pedagógico socrático y retorna `{ analogy: String, guidingQuestions: [String] }` sin revelar código ni respuestas directas.
- [ ] AC-3: `GET /api/dashboard/summary` soporta filtro `?level=junior|mid|senior`, priorizando recomendaciones del nivel seleccionado.
- [ ] AC-4: Script `npm run seed` actualizado con distribución estratificada: Junior (bases JS, async/await, CRUD Express), Mid (custom hooks, JWT, relaciones Mongo), Senior (libuv/event loop, concurrencia, índices compuestos, trade-offs).
- [ ] AC-5: Frontend: selector visual de nivel (Junior / Mid / Senior) en Dashboard y HardSkillTrainer.
- [ ] AC-6: Frontend: botón interactivo "💡 Dame una pista / Modelo Mental" en `HardSkillTrainer.jsx` que despliega la analogía y preguntas guía.
- [ ] AC-7: `server/tests/hint.test.js` con mock de Gemini + prueba E2E `tests/e2e/scaffolding.spec.js` pasando 100% en verde.

## 3. Subgrafo Afectado (Identificado con Graphify)

- **Nodos:** `Topic`, `getDashboardSummary()`, `HardSkillTrainer()`, `Dashboard()`, `geminiService.js`, `seed.js`, `practiceRouter`
- **Archivos a intervenir:**
  - `server/src/models/Topic.js` — añadir campo `level`
  - `server/src/services/geminiService.js` — añadir función `generateHint()`
  - `server/src/routes/practice.js` — añadir endpoint `POST /hint`
  - `server/src/controllers/dashboardController.js` — filtro `?level=`
  - `server/src/scripts/seed.js` — re-seed estratificado por nivel
  - `client/src/components/HardSkillTrainer.jsx` — selector de nivel + botón de pista
  - `client/src/components/Dashboard.jsx` — selector de nivel
  - `server/tests/hint.test.js` — prueba unitaria con mock (nuevo)
  - `tests/e2e/scaffolding.spec.js` — prueba E2E (nuevo)

## 4. Evidencia de Pruebas (Completado por verify-user-story)

### Tests Unitarios e Integración (Vitest / Supertest)

`Pendiente`

### Tests E2E (Playwright)

`Pendiente`

## 5. Commit de Cierre en dev

`Pendiente`
