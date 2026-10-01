import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Mockeamos @google/genai usando vi.mock para ejecución offline determinista
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent: vi.fn().mockImplementation(async ({ contents, config }) => {
          // Si el systemInstruction pide evaluar y retornar JSON:
          if (config?.responseMimeType === 'application/json' || (config?.systemInstruction && config.systemInstruction.includes('Evaluador'))) {
            return {
              text: JSON.stringify({
                score: 5,
                feedback: 'Excelente dominio del Event Loop de Node.js, fases de libuv y microtask queue.',
                missingTradeoffs: ['Impacto marginal en garbage collection'],
                strengths: ['Diferenciación exacta entre process.nextTick y setImmediate', 'Manejo de I/O starvation'],
              }),
            };
          }

          // En caso de generación de desafío:
          return {
            text: '¿Cómo previene Node.js el thread starvation en la fase de poll cuando existen callbacks continuos de process.nextTick? Explica el impacto en timers y setImmediate.',
          };
        }),
      },
    })),
  };
});

import { app } from '../src/app.js';
import { connectDB, disconnectDB } from '../src/db.js';
import { Topic } from '../src/models/Topic.js';
import { SessionLog } from '../src/models/SessionLog.js';

describe('Practice Hard Skills API Integration Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    process.env.GEMINI_API_KEY = 'mock-test-key';
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
    await SessionLog.deleteMany({});
  });

  describe('POST /api/practice/hard-skill/generate', () => {
    it('retorna 400 si no se envía topicId', async () => {
      const res = await request(app).post('/api/practice/hard-skill/generate').send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('topicId is required');
    });

    it('retorna 404 si el topicId no existe en la base de datos', async () => {
      const randomId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post('/api/practice/hard-skill/generate')
        .send({ topicId: randomId });
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Topic not found');
    });

    it('genera un desafío técnico adaptado retornando status 200 y el texto del reto', async () => {
      const topic = await Topic.create({
        title: 'Node.js Event Loop & Concurrency',
        category: 'hard_skill',
        type: 'theory',
      });

      const res = await request(app)
        .post('/api/practice/hard-skill/generate')
        .send({ topicId: topic._id });

      expect(res.status).toBe(200);
      expect(res.body.topicId).toBe(topic._id.toString());
      expect(res.body.title).toBe(topic.title);
      expect(res.body.challenge).toContain('Node.js');
      expect(res.body.challenge.length).toBeGreaterThan(15);
    });
  });

  describe('POST /api/practice/hard-skill/evaluate', () => {
    it('retorna 400 si faltan topicId, challenge o userSolution', async () => {
      const res = await request(app)
        .post('/api/practice/hard-skill/evaluate')
        .send({ topicId: '123' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('topicId, challenge, and userSolution are required');
    });

    it('retorna 404 si el topicId no existe', async () => {
      const randomId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post('/api/practice/hard-skill/evaluate')
        .send({
          topicId: randomId,
          challenge: 'Alguna pregunta',
          userSolution: 'Alguna solución',
        });
      expect(res.status).toBe(404);
    });

    it('evalúa con éxito la solución, actualiza Topic en Mongo con srsCalculator y guarda SessionLog', async () => {
      const topic = await Topic.create({
        title: 'React Concurrent Mode & Fiber',
        category: 'hard_skill',
        type: 'practice',
        srsStage: 0,
        easeFactor: 2.5,
        intervalDays: 0,
        nextReviewAt: new Date(Date.now() - 5000), // vencido
      });

      const res = await request(app)
        .post('/api/practice/hard-skill/evaluate')
        .send({
          topicId: topic._id,
          challenge: 'Explica cómo Fiber interrumpe el rendering y maneja prioridades con useTransition.',
          userSolution: 'Fiber organiza el trabajo en unidades discretas. useTransition marca updates de baja prioridad cediendo el hilo principal.',
        });

      expect(res.status).toBe(200);
      expect(res.body.score).toBe(5);
      expect(res.body.feedback).toBeDefined();
      expect(Array.isArray(res.body.missingTradeoffs)).toBe(true);
      expect(Array.isArray(res.body.strengths)).toBe(true);
      expect(res.body.srsStage).toBe(1);
      expect(res.body.intervalDays).toBe(1);
      expect(new Date(res.body.nextReviewAt).getTime()).toBeGreaterThan(Date.now());
      expect(res.body.sessionLogId).toBeDefined();

      // Verificar que el topic se actualizó en la base de datos
      const updatedTopic = await Topic.findById(topic._id);
      expect(updatedTopic.srsStage).toBe(1);
      expect(updatedTopic.history.length).toBe(1);
      expect(updatedTopic.history[0].score).toBe(5);
      expect(updatedTopic.history[0].userInput).toContain('Fiber organiza');

      // Verificar que se creó el SessionLog correspondiente
      const sessionLog = await SessionLog.findById(res.body.sessionLogId);
      expect(sessionLog).not.toBeNull();
      expect(sessionLog.topicId.toString()).toBe(topic._id.toString());
      expect(sessionLog.score).toBe(5);
      expect(sessionLog.feedback).toContain('Event Loop');
    });
  });
});
