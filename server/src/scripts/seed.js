import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Topic } from '../models/Topic.js';
import { connectDB, disconnectDB } from '../db.js';

dotenv.config();

export const SEED_TOPICS = [
  // ─── JUNIOR: Fundamentos JS, Async/Await, CRUD Express ───────────────────
  {
    title: 'Variables, Scope y Hoisting en JS',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Promesas y Async/Await',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'CRUD Básico con Express y MongoDB',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Closures y Funciones de Orden Superior',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'REST API: Verbos HTTP y Códigos de Estado',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React: Estado y Props',
    category: 'hard_skill',
    type: 'theory',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Mongoose: Schemas y Modelos Básicos',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Manejo de Errores con try/catch Asíncrono',
    category: 'hard_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── MID: Custom Hooks, JWT, Relaciones Mongo ─────────────────────────────
  {
    title: 'Custom Hooks en React',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'JWT: Autenticación y Refresh Tokens',
    category: 'hard_skill',
    type: 'theory',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Relaciones en MongoDB: Embed vs Reference',
    category: 'hard_skill',
    type: 'theory',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React Context y Gestión de Estado Global',
    category: 'hard_skill',
    type: 'theory',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Middleware en Express: Validación y Autorización',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'MongoDB Aggregation Pipelines',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Testing con Supertest y MongoMemoryServer',
    category: 'hard_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Seguridad - Token Architecture',
    category: 'hard_skill',
    type: 'theory',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── SENIOR: libuv/Event Loop, Concurrencia, Índices Compuestos, Trade-offs ─
  {
    title: 'Event Loop Internals y libuv',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Concurrencia en Node.js: Worker Threads y Cluster',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Índices Compuestos y Query Planner en MongoDB',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React Reconciliation & Fiber Internals',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Trade-offs: Consistencia vs Disponibilidad (CAP)',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Node.js Memory & Streams: Backpressure',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Arquitectura de Caché Distribuida',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Diseño de APIs Idempotentes a Escala',
    category: 'hard_skill',
    type: 'theory',
    level: 'senior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // ─── SOFT SKILLS: Defensa y Consultoría (sin nivel, aplican a todos) ──────
  {
    title: 'Defensa de Deuda Técnica',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Rechazo Asertivo de Microservicios Prematuros',
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
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Testing Automatizado',
    category: 'soft_skill',
    type: 'practice',
    level: 'junior',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Comunicación de Incidente Crítico (RCA)',
    category: 'soft_skill',
    type: 'practice',
    level: 'mid',
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
    level: 'junior',
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
    title: 'Manejo de Desacuerdos de Arquitectura',
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
    level: 'mid',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
];

/**
 * Función idempotente de seeding estratificada por nivel:
 * Para cada tema en SEED_TOPICS, actualiza o inserta basándose en el título único.
 * Si ya existe, actualiza el campo `level` para mantener la estratificación correcta.
 */
export async function seedTopics(topics = SEED_TOPICS) {
  const operations = topics.map((t) => ({
    updateOne: {
      filter: { title: t.title },
      update: {
        $set: {
          // Actualiza level siempre (para migrar topics existentes sin nivel)
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

    console.log(`Seeding ${SEED_TOPICS.length} Mid-to-Senior topics...`);
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
