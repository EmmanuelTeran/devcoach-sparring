# Graph Report - devcoach-sparring  (2026-09-30)

## Corpus Check
- 35 files · ~7,086 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: (none) 2, .css 1)

## Summary
- 205 nodes · 223 edges · 25 communities (20 shown, 5 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `9d631795`
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
- server/package.json
- package.json
- Guía de Usuario: DevCoach Sparring
- [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)
- devDependencies
- dependencies
- scripts
- Arquitectura Técnica del Sistema: DevCoach Sparring
- scripts
- [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)
- devDependencies

## God Nodes (most connected - your core abstractions)
1. `scripts` - 9 edges
2. `Grafo de Dependencias` - 7 edges
3. `Guía de Usuario: DevCoach Sparring` - 7 edges
4. `mongoose` - 6 edges
5. `Arquitectura Técnica del Sistema: DevCoach Sparring` - 6 edges
6. `[US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)` - 6 edges
7. `[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)` - 6 edges
8. `[US-XX] {{TITULO_HISTORIA}}` - 6 edges
9. `scripts` - 5 edges
10. `connectDB()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `bootstrap()` --calls--> `connectDB()`  [EXTRACTED]
  server/src/server.js → server/src/db.js

## Import Cycles
- None detected.

## Communities (25 total, 5 thin omitted)

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
Cohesion: 0.11
Nodes (18): dependencies, lucide-react, react, react-dom, vitest, name, private, type (+10 more)

### Community 12 - "server/package.json"
Cohesion: 0.12
Nodes (21): cors, dotenv, express, mongodb-memory-server, mongoose, supertest, vitest, name (+13 more)

### Community 13 - "package.json"
Cohesion: 0.09
Nodes (20): description, devDependencies, concurrently, @playwright/test, name, private, scripts, dev (+12 more)

### Community 14 - "Guía de Usuario: DevCoach Sparring"
Cohesion: 0.15
Nodes (12): 1. Requisitos Previos, 2. Instalación de Dependencias, 3. Cómo Arrancar la Aplicación en Local, 4.1 Comprobación Rápida de Salud (Healthcheck), 4. Cómo Verificar el Estado y la Salud del Sistema, 5. Batería de Pruebas Automatizadas, 6.1 Lógica de Calificación y Estados, 6.2 Pruebas Manuales con cURL (+4 more)

### Community 15 - "[US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-01] Scaffolding, Base Monorepo y Harness de Tests (Vitest + Playwright)

### Community 16 - "devDependencies"
Cohesion: 0.29
Nodes (7): devDependencies, autoprefixer, postcss, tailwindcss, vite, @vitejs/plugin-react, vitest

### Community 17 - "dependencies"
Cohesion: 0.40
Nodes (5): dependencies, cors, dotenv, express, mongoose

### Community 18 - "scripts"
Cohesion: 0.50
Nodes (4): scripts, dev, start, test

### Community 19 - "Arquitectura Técnica del Sistema: DevCoach Sparring"
Cohesion: 0.12
Nodes (16): 1. Topología del Monorepo, 2.1 `GET /api/health`, 2.2 `GET /api/topics/due`, 2.3 `POST /api/topics/review`, 2. Contratos de API, 3. Modelo de Datos (Mongoose Schemas), 4.1 Máquina de Estados del Motor Algorítmico SRS (SM-2 Adaptado), 4.2 Flujo de Arranque y Healthcheck (+8 more)

### Community 22 - "scripts"
Cohesion: 0.40
Nodes (5): scripts, build, dev, preview, test

### Community 23 - "[US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)"
Cohesion: 0.22
Nodes (8): 1. Descripción, 2. Criterios de Aceptación (AC), 3. Subgrafo Afectado (Identificado con Graphify), 4. Evidencia de Pruebas (Completado por verify-user-story), 5. Commit de Cierre en dev, Tests E2E (Playwright), Tests Unitarios e Integración (Vitest / Supertest), [US-02] Schemas Mongoose y Motor Algorítmico SRS (SM-2 Adaptado)

### Community 24 - "devDependencies"
Cohesion: 0.50
Nodes (4): devDependencies, mongodb-memory-server, supertest, vitest

## Knowledge Gaps
- **113 isolated node(s):** `name`, `version`, `private`, `type`, `dev` (+108 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 134 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **5 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `client/package.json`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `server/package.json`?**
  _High betweenness centrality (0.008) - this node is a cross-community bridge._
- **What connects `name`, `version`, `private` to the rest of the system?**
  _113 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `client/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.1067193675889328 - nodes in this community are weakly interconnected._
- **Should `server/package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.12310606060606061 - nodes in this community are weakly interconnected._
- **Should `package.json` be split into smaller, more focused modules?**
  _Cohesion score 0.08695652173913043 - nodes in this community are weakly interconnected._
- **Should `Arquitectura Técnica del Sistema: DevCoach Sparring` be split into smaller, more focused modules?**
  _Cohesion score 0.11764705882352941 - nodes in this community are weakly interconnected._