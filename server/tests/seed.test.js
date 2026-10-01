import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { connectDB, disconnectDB } from '../src/db.js';
import { Topic } from '../src/models/Topic.js';
import { seedTopics, SEED_TOPICS } from '../src/scripts/seed.js';

describe('Seed Script Integration Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    await connectDB(uri);
  });

  afterAll(async () => {
    await disconnectDB();
    if (mongoServer) {
      await mongoServer.stop();
    }
  });

  beforeEach(async () => {
    await Topic.deleteMany({});
  });

  it('siembra exactamente 30 temas en la base de datos limpia', async () => {
    expect(SEED_TOPICS.length).toBe(30);

    const stats = await seedTopics();
    expect(stats.upsertedCount).toBe(30);
    expect(stats.totalCount).toBe(30);

    const count = await Topic.countDocuments();
    expect(count).toBe(30);
  });

  it('valida que existen exactamente 15 Hard Skills y 15 Soft Skills con sus tipos respectivos', async () => {
    await seedTopics();

    const hardSkills = await Topic.find({ category: 'hard_skill' });
    const softSkills = await Topic.find({ category: 'soft_skill' });

    expect(hardSkills.length).toBe(15);
    expect(softSkills.length).toBe(15);

    // Hard skills deben ser de tipo 'theory'
    for (const hs of hardSkills) {
      expect(hs.type).toBe('theory');
      expect(hs.srsStage).toBe(0);
      expect(hs.easeFactor).toBeGreaterThanOrEqual(1.3);
      expect(hs.title).toBeTruthy();
    }

    // Soft skills deben ser de tipo 'practice'
    for (const ss of softSkills) {
      expect(ss.type).toBe('practice');
      expect(ss.srsStage).toBe(0);
      expect(ss.easeFactor).toBeGreaterThanOrEqual(1.3);
      expect(ss.title).toBeTruthy();
    }
  });

  it('es completamente idempotente: no duplica registros al ejecutarse múltiples veces', async () => {
    // Primera ejecución
    const firstRun = await seedTopics();
    expect(firstRun.upsertedCount).toBe(30);
    expect(firstRun.totalCount).toBe(30);

    // Segunda ejecución sin modificaciones
    const secondRun = await seedTopics();
    expect(secondRun.upsertedCount).toBe(0);
    expect(secondRun.totalCount).toBe(30);

    // Tercera ejecución
    const thirdRun = await seedTopics();
    expect(thirdRun.upsertedCount).toBe(0);
    expect(thirdRun.totalCount).toBe(30);

    const finalCount = await Topic.countDocuments();
    expect(finalCount).toBe(30);
  });

  it('respeta el progreso de SRS y no sobreescribe srsStage ni history existentes', async () => {
    await seedTopics();

    // Simular que el usuario avanzó en un tema
    const sampleTopic = await Topic.findOne({ title: 'Event Loop Internals' });
    expect(sampleTopic).not.toBeNull();

    sampleTopic.srsStage = 2;
    sampleTopic.easeFactor = 2.6;
    sampleTopic.intervalDays = 6;
    sampleTopic.history.push({
      score: 5,
      userInput: 'Explicación del event loop y fases de libuv',
      aiFeedback: 'Excelente comprensión',
      reviewedAt: new Date(),
    });
    await sampleTopic.save();

    // Re-ejecutar seed
    await seedTopics();

    const verifiedTopic = await Topic.findOne({ title: 'Event Loop Internals' });
    expect(verifiedTopic.srsStage).toBe(2);
    expect(verifiedTopic.easeFactor).toBe(2.6);
    expect(verifiedTopic.intervalDays).toBe(6);
    expect(verifiedTopic.history.length).toBe(1);
  });
});
