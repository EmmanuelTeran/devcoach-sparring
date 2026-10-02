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

  it('siembra el catálogo completo multinivel de 62 temas en la base de datos limpia', async () => {
    expect(SEED_TOPICS.length).toBe(62);

    const stats = await seedTopics();
    expect(stats.upsertedCount).toBe(62);
    expect(stats.totalCount).toBe(62);

    const count = await Topic.countDocuments();
    expect(count).toBe(62);
  });

  it('valida que cada nivel (Junior, Mid, Senior) tenga al menos 10 tópicos y distribución Hard/Soft', async () => {
    await seedTopics();

    const juniorTopics = await Topic.find({ level: 'junior' });
    const midTopics = await Topic.find({ level: 'mid' });
    const seniorTopics = await Topic.find({ level: 'senior' });

    // AC-4: Comprobando que cada nivel tenga al menos 10 tópicos
    expect(juniorTopics.length).toBeGreaterThanOrEqual(10);
    expect(midTopics.length).toBeGreaterThanOrEqual(10);
    expect(seniorTopics.length).toBeGreaterThanOrEqual(10);

    // Junior: 10 hard + 10 soft
    const juniorHard = juniorTopics.filter((t) => t.category === 'hard_skill');
    const juniorSoft = juniorTopics.filter((t) => t.category === 'soft_skill');
    expect(juniorHard.length).toBe(10);
    expect(juniorSoft.length).toBe(10);

    // Mid: 6 hard + 6 soft
    const midHard = midTopics.filter((t) => t.category === 'hard_skill');
    const midSoft = midTopics.filter((t) => t.category === 'soft_skill');
    expect(midHard.length).toBe(6);
    expect(midSoft.length).toBe(6);

    // Senior: 15 hard + 15 soft (los 30 originales de US-06)
    const seniorHard = seniorTopics.filter((t) => t.category === 'hard_skill');
    const seniorSoft = seniorTopics.filter((t) => t.category === 'soft_skill');
    expect(seniorHard.length).toBe(15);
    expect(seniorSoft.length).toBe(15);

    // Validar escenarios clave de Junior Soft Skills
    const juniorTitles = juniorSoft.map((t) => t.title);
    expect(juniorTitles.some((t) => t.toLowerCase().includes('daily'))).toBe(true);
    expect(juniorTitles.some((t) => t.toLowerCase().includes('pedir ayuda'))).toBe(true);
    expect(juniorTitles.some((t) => t.toLowerCase().includes('demo'))).toBe(true);
    expect(juniorTitles.some((t) => t.toLowerCase().includes('code review'))).toBe(true);
  });

  it('es completamente idempotente: no duplica registros al ejecutarse múltiples veces', async () => {
    // Primera ejecución
    const firstRun = await seedTopics();
    expect(firstRun.upsertedCount).toBe(62);
    expect(firstRun.totalCount).toBe(62);

    // Segunda ejecución sin modificaciones
    const secondRun = await seedTopics();
    expect(secondRun.upsertedCount).toBe(0);
    expect(secondRun.totalCount).toBe(62);

    // Tercera ejecución
    const thirdRun = await seedTopics();
    expect(thirdRun.upsertedCount).toBe(0);
    expect(thirdRun.totalCount).toBe(62);

    const finalCount = await Topic.countDocuments();
    expect(finalCount).toBe(62);
  });

  it('respeta el progreso de SRS y no sobreescribe srsStage ni history existentes', async () => {
    await seedTopics();

    // Simular que el usuario avanzó en un tema (usando un título del seed)
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
    if (verifiedTopic) {
      expect(verifiedTopic.srsStage).toBe(2);
      expect(verifiedTopic.easeFactor).toBe(2.6);
      expect(verifiedTopic.intervalDays).toBe(6);
      expect(verifiedTopic.history.length).toBe(1);
    }
  });

  it('actualiza el campo level en documentos existentes con bulkWrite forzando el nuevo level', async () => {
    // Insertar un documento previo con level desactualizado
    await Topic.create({
      title: 'Event Loop Internals',
      category: 'hard_skill',
      type: 'theory',
      level: 'junior', // Era junior incorrecto o antiguo
      srsStage: 3,
      easeFactor: 2.7,
    });

    await seedTopics();

    // Debe haber actualizado su level a senior respetando srsStage y easeFactor
    const updated = await Topic.findOne({ title: 'Event Loop Internals' });
    expect(updated).not.toBeNull();
    expect(updated.level).toBe('senior');
    expect(updated.srsStage).toBe(3);
    expect(updated.easeFactor).toBe(2.7);
  });
});
