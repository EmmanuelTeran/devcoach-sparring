# Graph Report - devcoach-sparring  (2026-09-30)

## Corpus Check
- 42 files · ~12,284 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .css 1, .example 1)

## Summary
- 238 nodes · 286 edges · 23 communities (18 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 2 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13cadfe1`
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
- practice.test.js
- package.json
- Guía de Usuario: DevCoach Sparring
- [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)
- server/package.json
- app.js
- 2. Contratos de API
- App.jsx
- [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)

## God Nodes (most connected - your core abstractions)
1. `scripts` - 9 edges
2. `mongoose` - 8 edges
3. `Guía de Usuario: DevCoach Sparring` - 8 edges
4. `Grafo de Dependencias` - 7 edges
5. `connectDB()` - 6 edges
6. `Arquitectura Técnica del Sistema: DevCoach Sparring` - 6 edges
7. `2. Contratos de API` - 6 edges
8. `[US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)` - 6 edges
9. `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)` - 6 edges
10. `[US-XX] {{TITULO_HISTORIA}}` - 6 edges

## Surprising Connections (you probably didn't know these)
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `calculateNextReview()`  [INFERRED]
  tickets/US-02-srs-engine-and-models.md → server/src/utils/srsCalculator.js
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `HardSkillTrainer()`  [INFERRED]
  tickets/US-03-hard-skills-module.md → client/src/components/HardSkillTrainer.jsx
- `bootstrap()` --calls--> `connectDB()`  [EXTRACTED]
  server/src/server.js → server/src/db.js
- `App()` --calls--> `HardSkillTrainer()`  [EXTRACTED]
  client/src/App.jsx → client/src/components/HardSkillTrainer.jsx

## Import Cycles
- None detected.

## Communities (23 total, 5 thin omitted)

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

### Community 12 - "practice.test.js"
Cohesion: 0.24
Nodes (12): mongodb-memory-server, mongoose, supertest, app, connectDB(), disconnectDB(), SessionLog, sessionLogSchema (+4 more)

### Community 13 - "package.json"
Cohesion: 0.08
Nodes (20): description, devDependencies, concurrently, @playwright/test, name, private, scripts, dev (+12 more)

### Community 14 - "Guía de Usuario: DevCoach Sparring"
Cohesion: 0.12
Nodes (16): 1. Requisitos Previos, 2. Instalación de Dependencias, 3. Cómo Arrancar la Aplicación en Local, 4.1 Comprobación Rápida de Salud (Healthcheck), 4. Cómo Verificar el Estado y la Salud del Sistema, 5. Batería de Pruebas Automatizadas, 6.1 Lógica de Calificación y Estados, 6.2 Pruebas Manuales con cURL (+8 more)

### Community 15 - "[US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)

### Community 17 - "server/package.json"
Cohesion: 0.09
Nodes (22): cors, dotenv, @google/genai, dependencies, cors, dotenv, express, @google/genai (+14 more)

### Community 18 - "app.js"
Cohesion: 0.27
Nodes (8): express, healthRouter, practiceRouter, topicsRouter, evaluateHardSkillSolution(), generateHardSkillChallenge(), getClient(), calculateNextReview()

### Community 19 - "2. Contratos de API"
Cohesion: 0.09
Nodes (22): 1. Topología del Monorepo, 2.1 `GET /api/health`, 2.2 `GET /api/topics/due`, 2.3 `POST /api/topics/review`, 2.4 `POST /api/practice/hard-skill/generate`, 2.5 `POST /api/practice/hard-skill/evaluate`, 2. Contratos de API, 3. Modelo de Datos (Mongoose Schemas) (+14 more)

### Community 22 - "App.jsx"
Cohesion: 0.17
Nodes (11): App(), HardSkillTrainer(), lucide-react, react, 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story) (+3 more)

### Community 23 - "[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)

## Knowledge Gaps
- **125 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+120 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 148 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `calculateNextReview()` connect `app.js` to `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._
- **Why does `3. Subgrafo Afectado (Identificado con Graphify)` connect `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)` to `app.js`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _125 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `client/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07142857142857142 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08333333333333333 - nodes in this community are weakly interconnected._
- **Should `Guía de Usuario: DevCoach Sparring` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._
- **Should `server/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._