# Graph Report - devcoach-sparring  (2026-09-30)

## Corpus Check
- 49 files · ~20,141 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 4 file(s) not represented in the graph (top: (none) 2, .css 1, .example 1)

## Summary
- 266 nodes · 348 edges · 26 communities (21 shown, 5 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 4 edges (avg confidence: 0.95)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `13b30821`
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
- app.js
- package.json
- Guía de Usuario: DevCoach Sparring
- [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)
- 2. Contratos de API
- server/package.json
- geminiService.js
- 4. Diagramas de Flujo y Arquitectura
- [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA
- [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)
- App.jsx
- [US-04] Módulo Soft Skills: Sparring por Voz (Web Speech API + Gemini)

## God Nodes (most connected - your core abstractions)
1. `Guía de Usuario: DevCoach Sparring` - 9 edges
2. `mongoose` - 9 edges
3. `scripts` - 9 edges
4. `2. Contratos de API` - 8 edges
5. `connectDB()` - 7 edges
6. `Grafo de Dependencias` - 7 edges
7. `Topic` - 7 edges
8. `Arquitectura Técnica del Sistema: DevCoach Sparring` - 6 edges
9. `4. Diagramas de Flujo y Arquitectura` - 6 edges
10. `app` - 6 edges

## Surprising Connections (you probably didn't know these)
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `calculateNextReview()`  [INFERRED]
  tickets/US-02-srs-engine-and-models.md → server/src/utils/srsCalculator.js
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `HardSkillTrainer()`  [INFERRED]
  tickets/US-03-hard-skills-module.md → client/src/components/HardSkillTrainer.jsx
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `SoftSkillTrainer()`  [INFERRED]
  tickets/US-04-soft-skills-voice.md → client/src/components/SoftSkillTrainer.jsx
- `3. Subgrafo Afectado (Identificado con Graphify)` --references--> `useVoiceInteraction()`  [INFERRED]
  tickets/US-04-soft-skills-voice.md → client/src/hooks/useVoiceInteraction.js
- `bootstrap()` --calls--> `connectDB()`  [EXTRACTED]
  server/src/server.js → server/src/db.js

## Import Cycles
- None detected.

## Communities (26 total, 5 thin omitted)

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
Nodes (26): dependencies, lucide-react, react, react-dom, devDependencies, autoprefixer, postcss, tailwindcss (+18 more)

### Community 12 - "app.js"
Cohesion: 0.15
Nodes (23): express, mongodb-memory-server, mongoose, supertest, vitest, app, connectDB(), disconnectDB() (+15 more)

### Community 13 - "package.json"
Cohesion: 0.08
Nodes (20): description, devDependencies, concurrently, @playwright/test, name, private, scripts, dev (+12 more)

### Community 14 - "Guía de Usuario: DevCoach Sparring"
Cohesion: 0.10
Nodes (20): 1. Requisitos Previos, 2. Instalación de Dependencias, 3. Cómo Arrancar la Aplicación en Local, 4.1 Comprobación Rápida de Salud (Healthcheck), 4. Cómo Verificar el Estado y la Salud del Sistema, 5. Batería de Pruebas Automatizadas, 6.1 Lógica de Calificación y Estados, 6.2 Pruebas Manuales con cURL (+12 more)

### Community 15 - "[US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)

### Community 16 - "2. Contratos de API"
Cohesion: 0.13
Nodes (15): 2.1 `GET /api/health`, 2.2 `GET /api/topics/due`, 2.3 `POST /api/topics/review`, 2.4 `POST /api/practice/hard-skill/generate`, 2.5 `POST /api/practice/hard-skill/evaluate`, 2.6 `POST /api/practice/soft-skill/start`, 2.7 `POST /api/practice/soft-skill/reply`, 2. Contratos de API (+7 more)

### Community 17 - "server/package.json"
Cohesion: 0.10
Nodes (20): cors, dotenv, dependencies, cors, dotenv, express, @google/genai, mongoose (+12 more)

### Community 18 - "geminiService.js"
Cohesion: 0.60
Nodes (4): @google/genai, evaluateHardSkillSolution(), generateHardSkillChallenge(), getClient()

### Community 19 - "4. Diagramas de Flujo y Arquitectura"
Cohesion: 0.15
Nodes (12): 1. Topología del Monorepo, 3. Modelo de Datos (Mongoose Schemas), 4.1 Flujo de Active Recall y Evaluación de Hard Skills (Gemini + SRS), 4.2 Máquina de Estados del Motor Algorítmico SRS (SM-2 Adaptado), 4.3 Flujo de Arranque y Healthcheck, 4.4 Harness de Testing y E2E Playwright, 4.5 Flujo de Sparring por Voz (Web Speech API + Gemini + SRS), 4. Diagramas de Flujo y Arquitectura (+4 more)

### Community 22 - "[US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA"
Cohesion: 0.25
Nodes (7): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-03] Módulo Hard Skills: Active Recall Teórico y Práctico con IA

### Community 23 - "[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)

### Community 24 - "App.jsx"
Cohesion: 0.30
Nodes (8): App(), HardSkillTrainer(), SoftSkillTrainer(), useVoiceInteraction(), lucide-react, react, react-dom, 3. Subgrafo Afectado (Identificado con Graphify)

### Community 25 - "[US-04] Módulo Soft Skills: Sparring por Voz (Web Speech API + Gemini)"
Cohesion: 0.29
Nodes (6): 1. Descripción, 2. Criterios de Aceptación (AC), 4. Evidencia de Pruebas (Completado por verify-user-story), Tests End-to-End Frontend (Playwright), Tests Unitarios e Integración Backend (Vitest / Supertest), [US-04] Módulo Soft Skills: Sparring por Voz (Web Speech API + Gemini)

## Knowledge Gaps
- **135 isolated node(s):** `Heartbeat del Proyecto`, `1. Topología del Monorepo`, `Códigos de Respuesta`, `Códigos de Respuesta`, `Códigos de Respuesta` (+130 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 159 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `calculateNextReview()` connect `app.js` to `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)`?**
  _High betweenness centrality (0.017) - this node is a cross-community bridge._
- **Why does `3. Subgrafo Afectado (Identificado con Graphify)` connect `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)` to `app.js`?**
  _High betweenness centrality (0.015) - this node is a cross-community bridge._
- **What connects `Heartbeat del Proyecto`, `1. Topología del Monorepo`, `Códigos de Respuesta` to the rest of the system?**
  _135 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `client/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.07407407407407407 - nodes in this community are weakly interconnected._
- **Should `app.js` be split into smaller, more focused modules?**
  _Cohesion score 0.1484480431848853 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._
- **Should `Guía de Usuario: DevCoach Sparring` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._