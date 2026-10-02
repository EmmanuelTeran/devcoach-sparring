import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Topic } from '../models/Topic.js';
import { connectDB, disconnectDB } from '../db.js';

dotenv.config();

export const SEED_TOPICS = [
  // ─── 10 JUNIOR HARD SKILLS ──────────────────────────────────────────────────
  {
    title: 'Métodos de Arrays en JS (map, filter, reduce)',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Async/Await vs Callbacks y Promesas',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'CRUD Básico en Express y Mongoose',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Códigos de Estado HTTP y Verbos REST',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Scopes, Closures y Contexto Léxico',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React: useState y Manejo Inmutable de Estado',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React: useEffect, Dependencias y Cleanup',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Validación de Inputs con Schemas Simples',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Queries Básicas en MongoDB (Filtros y Proyecciones)',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Renderizado Condicional y Listas en React',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── 10 JUNIOR SOFT SKILLS (Interacciones Críticas) ─────────────────────────
  {
    title: 'Daily Standup: Estructura Qué Hice, Qué Haré y Bloqueos',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Pedir Ayuda: Formular Dudas con Hipótesis Previas',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Demo de Ticket a PM: Explicar Valor sin Jerga',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Code Review: Argumentar Técnicamente sin Personalismos',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Aclaración de Requerimientos y Criterios de Aceptación',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Estimación de Tareas Pequeñas y Desglose de Subtareas',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Manejo de Errores en Staging y Reporte Transparente',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Entrega con Documentación para QA y Edge Cases',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Priorización de Interrupciones en Mitad de Sprint',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Alineación Asertiva con el Equipo de Diseño UI/UX',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── 6 MID HARD SKILLS ──────────────────────────────────────────────────────
  {
    title: 'Custom Hooks en React: Reutilización de Lógica',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Context API vs Zustand: Estado Global',
    category: 'hard_skill',
    type: 'theory',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Índices Simples y Rendimiento en MongoDB',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Arquitectura en Capas: Controller, Service y Model',
    category: 'hard_skill',
    type: 'theory',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Autenticación con JWT, Cookies y Refresh Tokens',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Refactorización Segura sin Romper Contratos Técnicos',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── 6 MID SOFT SKILLS ──────────────────────────────────────────────────────
  {
    title: 'Negociación de Deuda Técnica en Sprint',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Refactorización sin Romper Contratos (Defensa ante PM)',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Gestión de Dependencias y Bloqueos de Equipo',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Negociación de Fechas y Estimación de Épicas',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Testing de Integración en el Pipeline',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Manejo de Incidencias en Producción (Comunicación a Negocio)',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── 15 SENIOR HARD SKILLS (30 originales US-06) ────────────────────────────
  {
    title: 'Event Loop Internals',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Node.js Memory & Streams',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React Reconciliation & Fiber',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React State Management Trade-offs',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React Performance Profiling',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Bases de Datos - Índices Compuestos',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Transacciones & Concurrencia',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'MongoDB Modeling',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Protocolos de Red',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'WebSockets vs SSE',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Seguridad - Token Architecture',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Rate Limiting & Resiliencia',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Arquitectura de Caché',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Diseño de APIs Idempotentes',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Containerización y Despliegue',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── 15 SENIOR SOFT SKILLS (30 originales US-06) ────────────────────────────
  {
    title: 'Defensa de Deuda Técnica',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Rechazo Asertivo de Microservicios',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Negociación de Fechas Imposibles',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Testing Automatizado',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Comunicación de Incidente Crítico (RCA)',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Propuesta de Migración Tecnológica',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Manejo de Requerimientos Ambiguos',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Accesibilidad y Web Vitals',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Negociación de Cambios Fuera de Alcance',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Trade-offs de Herramientas AI / Vibe Coding',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Priorización de Fallos de Seguridad',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Manejo de Desacuerdos de Arquitectura',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Explicación de Costos Cloud',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Simplificación de Código',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Demostración de Valor Técnico',
    category: 'soft_skill',
    type: 'practice',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
];

/**
 * Función idempotente de seeding estratificada por nivel:
 * Para cada tema en SEED_TOPICS, actualiza o inserta basándose en el título único.
 * Si ya existe, actualiza el campo `level`, `category` y `type` usando bulkWrite con upsert: true.
 * Preserva srsStage, easeFactor, intervalDays, nextReviewAt y history si el documento ya existía.
 */
export async function seedTopics(topics = SEED_TOPICS) {
  const operations = topics.map((t) => ({
    updateOne: {
      filter: { title: t.title },
      update: {
        $set: {
          level: t.level || 'junior',
          category: t.category,
          type: t.type,
        },
        $setOnInsert: {
          srsStage: t.srsStage ?? 0,
          easeFactor: t.easeFactor ?? 2.5,
          intervalDays: t.intervalDays ?? 0,
          nextReviewAt: t.nextReviewAt || new Date(),
          history: t.history || [],
        },
      },
      upsert: true,
    },
  }));

  const result = await Topic.bulkWrite(operations);
  const totalCount = await Topic.countDocuments();
  return {
    upsertedCount: result.upsertedCount,
    matchedCount: result.matchedCount,
    modifiedCount: result.modifiedCount,
    totalCount,
  };
}

async function runStandaloneSeed() {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/devcoach';
    console.log(`Connecting to MongoDB at ${mongoUri}...`);
    await connectDB(mongoUri);

    console.log(`Seeding ${SEED_TOPICS.length} Multilevel topics (Junior, Mid, Senior)...`);
    const stats = await seedTopics();

    console.log('Seeding completed successfully:');
    console.log(`- Upserted: ${stats.upsertedCount}`);
    console.log(`- Matched/Existing: ${stats.matchedCount}`);
    console.log(`- Total topics in DB: ${stats.totalCount}`);

    await disconnectDB();
    process.exit(0);
  } catch (error) {
    console.error('Error during seeding execution:', error);
    process.exit(1);
  }
}

// Si se ejecuta directamente desde node
if (process.argv[1] && process.argv[1].endsWith('seed.js')) {
  runStandaloneSeed();
}
