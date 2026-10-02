# Graph Report - devcoach-sparring  (2026-10-02)

## Corpus Check
- 63 files · ~33,159 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .css 1, .example 1)

## Summary
- 347 nodes · 487 edges · 29 communities (24 shown, 5 thin omitted)
- Extraction: 97% EXTRACTED · 3% INFERRED · 0% AMBIGUOUS · INFERRED: 13 edges (avg confidence: 0.94)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `a2ec648f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Grafo de Dependencias
- [US-XX] {{TITULO_HISTORIA}}
- Contexto del Proyecto: Entrenador Personal Fullstack (Hard & Soft Skills)
- Skill: document-tech-specs
- Skill: document-user-guide
- Skill: implement-story
- Skill: new-user-story
- Skill: verify-user-story
- rules/graphify.md
- workflows/graphify.md
- heartbeat.md
- client/package.json
- Topic.js
- package.json
- Guía de Usuario: DevCoach Sparring
- [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)
- 2. Contratos de API
- server/package.json
- App.jsx
- 4. Diagramas de Flujo y Arquitectura
- [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA
- [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)
- [US-05] Dashboard Operativo y Acoplamiento de Habilidades (Hard + Soft Skills)
- [US-08] Catálogo Completo Multinivel (Junior/Mid/Senior) y Sincronización UI
- app.js
- [US-06] Seed Senior (30 Temas Clave) y Suite E2E Final
- [US-07] Niveles de Progresión y Andamiaje Pedagógico (Scaffolding)

## God Nodes (most connected - your core abstractions)
1. `mongoose` - 13 edges
2. `Topic` - 12 edges
3. `connectDB()` - 11 edges
4. `Guía de Usuario: DevCoach Sparring` - 11 edges
5. `scripts` - 10 edges
6. `disconnectDB()` - 9 edges
7. `Grafo de Dependencias` - 9 edges
8. `2. Contratos de API` - 9 edges
9. `@playwright/test` - 8 edges
10. `mongodb-memory-server` - 8 edges

## Surprising Connections (you probably didn't know these)
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `HardSkillTrainer()`  [INFERRED]
  tickets/US-03-hard-skills-module.md → client/src/components/HardSkillTrainer.jsx
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `calculateNextReview()`  [INFERRED]
  tickets/US-02-srs-engine-and-models.md → server/src/utils/srsCalculator.js
- `[US-04] Módulo Soft Skills: Sparring por Voz (Web Speech API + Gemini)` --references--> `useVoiceInteraction()`  [INFERRED]
  .antigravity/graph.md → client/src/hooks/useVoiceInteraction.js
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `getDashboardSummary()`  [INFERRED]
  tickets/US-07-progression-levels-and-scaffolding.md → server/src/controllers/dashboardController.js
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `getDashboardSummary()`  [INFERRED]
  tickets/US-08-multilevel-catalog-and-ui-sync.md → server/src/controllers/dashboardController.js

## Import Cycles
- None detected.

## Communities (29 total, 5 thin omitted)

### Community 0 - "Grafo de Dependencias"
Cohesion: 0.20
Nodes (9): Grafo de Dependencias, Grafo de Implementación: DevCoach Sparring, [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright), [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado), [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico, [US-05] Dashboard Operativo y Acoplamiento de Habilidades, [US-06] Seed Senior del Roadmap y Validación E2E Total, [US-07] Niveles de Progresión y Andamiaje Pedagógico (Scaffolding) (+1 more)

### Community 1 - "[US-XX] {{TITULO_HISTORIA}}"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-XX] {{TITULO_HISTORIA}}

### Community 2 - "Contexto del Proyecto: Entrenador Personal Fullstack (Hard & Soft Skills)"
Cohesion: 0.33
Nodes (5): 1. Stack Tecnológico Estricto, 2. Política de Tokens y Graphify en Modo Estricto (PreToolUse), 3. Principios de Código (mattpocock/skills), 4. Gestión de Tareas y Git, Contexto del Proyecto: Entrenador Personal Fullstack (Hard & Soft Skills)

### Community 3 - "Skill: document-tech-specs"
Cohesion: 0.50
Nodes (3): Pasos de Ejecución, Propósito, Skill: document-tech-specs

### Community 4 - "Skill: document-user-guide"
Cohesion: 0.50
Nodes (3): Pasos de Ejecución, Propósito, Skill: document-user-guide

### Community 5 - "Skill: implement-story"
Cohesion: 0.50
Nodes (3): Pasos de Ejecución, Propósito, Skill: implement-story

### Community 6 - "Skill: new-user-story"
Cohesion: 0.50
Nodes (3): Pasos de Ejecución, Propósito, Skill: new-user-story

### Community 7 - "Skill: verify-user-story"
Cohesion: 0.50
Nodes (3): Pasos de Ejecución, Propósito, Skill: verify-user-story

### Community 11 - "client/package.json"
Cohesion: 0.07
Nodes (26): dependencies, lucide-react, react, react-dom, devDependencies, autoprefixer, postcss, tailwindcss (+18 more)

### Community 12 - "Topic.js"
Cohesion: 0.25
Nodes (16): dotenv, mongodb-memory-server, mongoose, supertest, app, connectDB(), disconnectDB(), SessionLog (+8 more)

### Community 13 - "package.json"
Cohesion: 0.07
Nodes (21): description, devDependencies, concurrently, @playwright/test, name, private, scripts, dev (+13 more)

### Community 14 - "Guía de Usuario: DevCoach Sparring"
Cohesion: 0.07
Nodes (27): 10.1 Interpretación de Métricas Rápidas, 10.2 Priorización Automática: Botón "Entrenar Ahora" (`recommendedNext`), 10.3 Gestión y Limpieza de Áreas Críticas, 10. Panel de Control y Dashboard Operativo, 1. Requisitos Previos, 2. Instalación de Dependencias, 3.1 Poblado Inicial de la Base de Datos (Seeding Idempotente), 3.2 Levantamiento Concurrente (+19 more)

### Community 15 - "[US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)

### Community 16 - "2. Contratos de API"
Cohesion: 0.12
Nodes (17): 2.1 `GET /api/health`, 2.2 `GET /api/topics/due`, 2.3 `POST /api/topics/review`, 2.4 `POST /api/practice/hard-skill/generate`, 2.5 `POST /api/practice/hard-skill/evaluate`, 2.6 `POST /api/practice/soft-skill/start`, 2.7 `POST /api/practice/soft-skill/reply`, 2.8 `GET /api/dashboard/summary` (+9 more)

### Community 17 - "server/package.json"
Cohesion: 0.09
Nodes (22): cors, @google/genai, dependencies, cors, dotenv, express, @google/genai, mongoose (+14 more)

### Community 18 - "App.jsx"
Cohesion: 0.09
Nodes (27): [US-04] Módulo Soft Skills: Sparring por Voz (Web Speech API + Gemini), App(), Dashboard(), LEVEL_ACTIVE, LEVEL_LABELS, LEVEL_STYLES, HardSkillTrainer(), LEVEL_ACTIVE (+19 more)

### Community 19 - "4. Diagramas de Flujo y Arquitectura"
Cohesion: 0.12
Nodes (15): 1. Topología del Monorepo, 3. Modelo de Datos (Mongoose Schemas), 4.1 Flujo de Active Recall y Evaluación de Hard Skills (Gemini + SRS), 4.2 Máquina de Estados del Motor Algorítmico SRS (SM-2 Adaptado), 4.3 Flujo de Arranque y Healthcheck, 4.4 Harness de Testing y E2E Playwright, 4.5 Flujo de Sparring por Voz (Web Speech API + Gemini + SRS), 4.6 Lógica de Recomendación Acoplada (Hard Skills + Soft Skills) (+7 more)

### Community 22 - "[US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA

### Community 23 - "[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)

### Community 24 - "[US-05] Dashboard Operativo y Acoplamiento de Habilidades (Hard + Soft Skills)"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), Tests End-to-End (Playwright), Tests Unitarios e Integración Backend (Vitest / Supertest), [US-05] Dashboard Operativo y Acoplamiento de Habilidades (Hard + Soft Skills)

### Community 25 - "[US-08] Catálogo Completo Multinivel (Junior/Mid/Senior) y Sincronización UI"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-08] Catálogo Completo Multinivel (Junior/Mid/Senior) y Sincronización UI

### Community 26 - "app.js"
Cohesion: 0.14
Nodes (19): express, areTopicsRelated(), extractKeywords(), getDashboardSummary(), getLastScore(), dashboardRouter, healthRouter, practiceRouter (+11 more)

### Community 28 - "[US-06] Seed Senior (30 Temas Clave) y Suite E2E Final"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), Pruebas E2E (Playwright), Tests Unitarios e Integración Backend (Vitest / Supertest), [US-06] Seed Senior (30 Temas Clave) y Suite E2E Final

### Community 29 - "[US-07] Niveles de Progresión y Andamiaje Pedagógico (Scaffolding)"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-07] Niveles de Progresión y Andamiaje Pedagógico (Scaffolding)

## Knowledge Gaps
- **177 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+172 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 209 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `3. Subgrafo Afectado (Identificado con Graphify)` connect `App.jsx` to `app.js`, `[US-07] Niveles de Progresión y Andamiaje Pedagógico (Scaffolding)`?**
  _High betweenness centrality (0.095) - this node is a cross-community bridge._
- **Why does `getDashboardSummary()` connect `app.js` to `App.jsx`?**
  _High betweenness centrality (0.088) - this node is a cross-community bridge._
- **Why does `3. Subgrafo Afectado (Identificado con Graphify)` connect `App.jsx` to `[US-08] Catálogo Completo Multinivel (Junior/Mid/Senior) y Sincronización UI`, `app.js`?**
  _High betweenness centrality (0.078) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _177 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `client/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.06896551724137931 - nodes in this community are weakly interconnected._
- **Should `Guía de Usuario: DevCoach Sparring` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._