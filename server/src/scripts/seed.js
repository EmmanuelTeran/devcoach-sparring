import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Topic } from '../models/Topic.js';
import { connectDB, disconnectDB } from '../db.js';

dotenv.config();

export const SEED_TOPICS = [
  // 15 Hard Skills (teóricos y prácticos en React, Node.js, Bases de Datos, Protocolos y Seguridad)
  {
    title: 'Event Loop Internals',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Node.js Memory & Streams',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React Reconciliation & Fiber',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React State Management Trade-offs',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'React Performance Profiling',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Bases de Datos - Índices Compuestos',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Transacciones & Concurrencia',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'MongoDB Modeling',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Protocolos de Red',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'WebSockets vs SSE',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Seguridad - Token Architecture',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Rate Limiting & Resiliencia',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Arquitectura de Caché',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Diseño de APIs Idempotentes',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Containerización y Despliegue',
    category: 'hard_skill',
    type: 'theory',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },

  // 15 Soft Skills (Consultoría, Negociación y Defensa de Decisiones Técnicas ante Clientes y Tech Leads)
  {
    title: 'Defensa de Deuda Técnica',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Rechazo Asertivo de Microservicios',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Negociación de Fechas Imposibles',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Testing Automatizado',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Comunicación de Incidente Crítico (RCA)',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Propuesta de Migración Tecnológica',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Manejo de Requerimientos Ambiguos',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Accesibilidad y Web Vitals',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Negociación de Cambios Fuera de Alcance',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Trade-offs de Herramientas AI / Vibe Coding',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Priorización de Fallos de Seguridad',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Manejo de Desacuerdos de Arquitectura',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Explicación de Costos Cloud',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Defensa de Simplificación de Código',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
  {
    title: 'Demostración de Valor Técnico',
    category: 'soft_skill',
    type: 'practice',
    srsStage: 0,
    easeFactor: 2.5,
    intervalDays: 0,
  },
];

/**
 * Función idempotente de seeding:
 * Para cada tema en SEED_TOPICS, actualiza o inserta basándose en el título único.
 * Si ya existe, preserva los campos y sólo actualiza campos base si es necesario.
 */
export async function seedTopics(topics = SEED_TOPICS) {
  const operations = topics.map((t) => ({
    updateOne: {
      filter: { title: t.title },
      update: {
        $setOnInsert: {
          category: t.category,
          type: t.type,
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
