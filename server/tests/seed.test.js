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

  it('siembra exactamente 34 temas en la base de datos limpia', async () => {
    expect(SEED_TOPICS.length).toBe(34);

    const stats = await seedTopics();
    expect(stats.upsertedCount).toBe(34);
    expect(stats.totalCount).toBe(34);

    const count = await Topic.countDocuments();
    expect(count).toBe(34);
  });

  it('valida distribución estratificada por nivel (Junior/Mid/Senior) y categorías Hard/Soft', async () => {
    await seedTopics();

    const hardSkills = await Topic.find({ category: 'hard_skill' });
    const softSkills = await Topic.find({ category: 'soft_skill' });

    // 24 hard skills (8 junior + 8 mid + 8 senior), 10 soft skills
    expect(hardSkills.length).toBe(24);
    expect(softSkills.length).toBe(10);

    // Validar que hay topics en los 3 niveles
    const juniorTopics = await Topic.find({ level: 'junior' });
    const midTopics = await Topic.find({ level: 'mid' });
    const seniorTopics = await Topic.find({ level: 'senior' });
    expect(juniorTopics.length).toBeGreaterThan(0);
    expect(midTopics.length).toBeGreaterThan(0);
    expect(seniorTopics.length).toBeGreaterThan(0);

    // Soft skills deben ser de tipo 'practice'
    for (const ss of softSkills) {
      expect(ss.type).toBe('practice');
      expect(ss.srsStage).toBe(0);
      expect(ss.easeFactor).toBeGreaterThanOrEqual(1.3);
      expect(ss.title).toBeTruthy();
    }

    // Todos deben tener srsStage inicial 0
    for (const topic of [...hardSkills, ...softSkills]) {
      expect(topic.srsStage).toBe(0);
      expect(topic.title).toBeTruthy();
    }
  });

  it('es completamente idempotente: no duplica registros al ejecutarse múltiples veces', async () => {
    // Primera ejecución
    const firstRun = await seedTopics();
    expect(firstRun.upsertedCount).toBe(34);
    expect(firstRun.totalCount).toBe(34);

    // Segunda ejecución sin modificaciones
    const secondRun = await seedTopics();
    expect(secondRun.upsertedCount).toBe(0);
    expect(secondRun.totalCount).toBe(34);

    // Tercera ejecución
    const thirdRun = await seedTopics();
    expect(thirdRun.upsertedCount).toBe(0);
    expect(thirdRun.totalCount).toBe(34);

    const finalCount = await Topic.countDocuments();
    expect(finalCount).toBe(34);
  });

  it('respeta el progreso de SRS y no sobreescribe srsStage ni history existentes', async () => {
    await seedTopics();

    // Simular que el usuario avanzó en un tema (usando un título del nuevo seed)
    const sampleTopic = await Topic.findOne({ title: 'Event Loop Internals y libuv' });
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

    const verifiedTopic = await Topic.findOne({ title: 'Event Loop Internals y libuv' });
    expect(verifiedTopic.srsStage).toBe(2);
    expect(verifiedTopic.easeFactor).toBe(2.6);
    expect(verifiedTopic.intervalDays).toBe(6);
    expect(verifiedTopic.history.length).toBe(1);
  });
});
