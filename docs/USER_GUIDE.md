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
