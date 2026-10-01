# Graph Report - devcoach-sparring  (2026-09-30)

## Corpus Check
- 55 files · ~24,566 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .css 1, .example 1)

## Summary
- 278 nodes · 355 edges · 27 communities (22 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.92)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `216f1f68`
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
- dashboard.test.js
- package.json
- Guía de Usuario: DevCoach Sparring
- [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)
- 2. Contratos de API
- app.js
- App.jsx
- 4. Diagramas de Flujo y Arquitectura
- [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA
- [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)
- [US-05] Dashboard Operativo y Acoplamiento de Habilidades (Hard + Soft Skills)
- dashboardController.js
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `Guía de Usuario: DevCoach Sparring` - 10 edges
2. `2. Contratos de API` - 9 edges
3. `mongoose` - 9 edges
4. `scripts` - 9 edges
5. `4. Diagramas de Flujo y Arquitectura` - 7 edges
6. `connectDB()` - 7 edges
7. `Grafo de Dependencias` - 7 edges
8. `Topic` - 7 edges
9. `Arquitectura Técnica del Sistema: DevCoach Sparring` - 6 edges
10. `app` - 6 edges

## Surprising Connections (you probably didn't know these)
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `calculateNextReview()`  [INFERRED]
  tickets/US-02-srs-engine-and-models.md → server/src/utils/srsCalculator.js
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `HardSkillTrainer()`  [INFERRED]
  tickets/US-03-hard-skills-module.md → client/src/components/HardSkillTrainer.jsx
- `bootstrap()` --calls--> `connectDB()`  [EXTRACTED]
  server/src/server.js → server/src/db.js
- `App()` --calls--> `Dashboard()`  [EXTRACTED]
  client/src/App.jsx → client/src/components/Dashboard.jsx
- `App()` --calls--> `HardSkillTrainer()`  [EXTRACTED]
  client/src/App.jsx → client/src/components/HardSkillTrainer.jsx

## Import Cycles
- None detected.

## Communities (27 total, 5 thin omitted)

### Community 0 - "Grafo de Dependencias"
Cohesion: 0.22
Nodes (8): Grafo de Dependencias, Grafo de Implementación: DevCoach Sparring, [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright), [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado), [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico, [US-04] Módulo Soft Skills: Sparring por Voz (Web Speech API + Gemini), [US-05] Dashboard Operativo y Acoplamiento de Habilidades, [US-06] Seed Senior del Roadmap y Validación E2E Total

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
Nodes (27): dependencies, lucide-react, react, react-dom, devDependencies, autoprefixer, postcss, tailwindcss (+19 more)

### Community 12 - "dashboard.test.js"
Cohesion: 0.27
Nodes (12): mongodb-memory-server, mongoose, supertest, app, connectDB(), disconnectDB(), SessionLog, sessionLogSchema (+4 more)

### Community 13 - "package.json"
Cohesion: 0.08
Nodes (20): description, devDependencies, concurrently, @playwright/test, name, private, scripts, dev (+12 more)

### Community 14 - "Guía de Usuario: DevCoach Sparring"
Cohesion: 0.08
Nodes (24): 1. Requisitos Previos, 2. Instalación de Dependencias, 3. Cómo Arrancar la Aplicación en Local, 4.1 Comprobación Rápida de Salud (Healthcheck), 4. Cómo Verificar el Estado y la Salud del Sistema, 5. Batería de Pruebas Automatizadas, 6.1 Lógica de Calificación y Estados, 6.2 Pruebas Manuales con cURL (+16 more)

### Community 15 - "[US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)

### Community 16 - "2. Contratos de API"
Cohesion: 0.12
Nodes (17): 2.1 `GET /api/health`, 2.2 `GET /api/topics/due`, 2.3 `POST /api/topics/review`, 2.4 `POST /api/practice/hard-skill/generate`, 2.5 `POST /api/practice/hard-skill/evaluate`, 2.6 `POST /api/practice/soft-skill/start`, 2.7 `POST /api/practice/soft-skill/reply`, 2.8 `GET /api/dashboard/summary` (+9 more)

### Community 17 - "app.js"
Cohesion: 0.08
Nodes (26): cors, dotenv, express, @google/genai, dependencies, cors, dotenv, express (+18 more)

### Community 18 - "App.jsx"
Cohesion: 0.30
Nodes (6): App(), Dashboard(), HardSkillTrainer(), SoftSkillTrainer(), lucide-react, react

### Community 19 - "4. Diagramas de Flujo y Arquitectura"
Cohesion: 0.14
Nodes (13): 1. Topología del Monorepo, 3. Modelo de Datos (Mongoose Schemas), 4.1 Flujo de Active Recall y Evaluación de Hard Skills (Gemini + SRS), 4.2 Máquina de Estados del Motor Algorítmico SRS (SM-2 Adaptado), 4.3 Flujo de Arranque y Healthcheck, 4.4 Harness de Testing y E2E Playwright, 4.5 Flujo de Sparring por Voz (Web Speech API + Gemini + SRS), 4.6 Lógica de Recomendación Acoplada (Hard Skills + Soft Skills) (+5 more)

### Community 22 - "[US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA

### Community 23 - "[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)

### Community 24 - "[US-05] Dashboard Operativo y Acoplamiento de Habilidades (Hard + Soft Skills)"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), Tests End-to-End (Playwright), Tests Unitarios e Integración Backend (Vitest / Supertest), [US-05] Dashboard Operativo y Acoplamiento de Habilidades (Hard + Soft Skills)

### Community 25 - "dashboardController.js"
Cohesion: 0.48
Nodes (5): areTopicsRelated(), extractKeywords(), getDashboardSummary(), getLastScore(), dashboardRouter

### Community 26 - "devDependencies"
Cohesion: 0.50
Nodes (4): devDependencies, mongodb-memory-server, supertest, vitest

## Knowledge Gaps
- **141 isolated node(s):** `Heartbeat del Proyecto`, `1. Topología del Monorepo`, `Códigos de Respuesta`, `Códigos de Respuesta`, `Códigos de Respuesta` (+136 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 169 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `calculateNextReview()` connect `app.js` to `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._
- **Why does `3. Subgrafo Afectado (Identificado con Graphify)` connect `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)` to `app.js`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **What connects `Heartbeat del Proyecto`, `1. Topología del Monorepo`, `Códigos de Respuesta` to the rest of the system?**
  _141 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `client/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Guía de Usuario: DevCoach Sparring` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `2. Contratos de API` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._