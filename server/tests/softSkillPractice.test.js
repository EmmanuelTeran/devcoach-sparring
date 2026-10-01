import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest';
import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

// Mockeamos @google/genai usando vi.mock para ejecución offline y determinista
vi.mock('@google/genai', () => {
  return {
    GoogleGenAI: vi.fn().mockImplementation(() => ({
      models: {
        generateContent: vi.fn().mockImplementation(async ({ contents, config }) => {
          const sys = config?.systemInstruction || '';

          // 1. Escenario inicial (start)
          if (sys.includes('actor de rol simulando a un stakeholder')) {
            return {
              text: JSON.stringify({
                scenario: 'El cliente quiere recortar costos y eliminar la capa de redundancia.',
                initialQuestion: '¿Por qué necesitamos invertir tanto tiempo y dinero en alta disponibilidad si nuestro tráfico actual es bajo?',
              }),
            };
          }

          // 2. Veredicto final (3er turno)
          if (sys.includes('Evaluador Senior de Habilidades de Consultoría Técnica')) {
            return {
              text: JSON.stringify({
                score: 4,
                feedback: 'Buena articulación del balance entre costo de inactividad vs inversión en arquitectura resiliente.',
                businessClarity: 'Tradujo efectivamente el concepto de SLA y downtime a pérdidas financieras cuantificables.',
                tradeOffDefense: 'Defendió correctamente el trade-off de costo inicial frente a riesgo operacional.',
                assertivenessScore: 4,
                missingTradeoffs: ['No mencionó opciones intermedias como degradación elegante progresiva.'],
                strengths: ['Excelente manejo de objeciones sin perder la compostura.', 'Enfoque centrado en el cliente.'],
              }),
            };
          }

          // 3. Réplica intermedia escéptica
          return {
            text: 'Eso suena razonable en teoría, pero nuestro presupuesto mensual está al límite. ¿Qué alternativa más barata me propones para no comprometer el lanzamiento?',
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

describe('Soft Skill Sparring API Integration Tests', () => {
  let mongoServer;

  beforeAll(async () => {
    process.env.GEMINI_API_KEY = 'mock-soft-skill-key';
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

  describe('POST /api/practice/soft-skill/start', () => {
    it('retorna 400 si no se envía topicId', async () => {
      const res = await request(app).post('/api/practice/soft-skill/start').send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('topicId is required');
    });

    it('retorna 404 si el topicId no existe', async () => {
      const randomId = new mongoose.Types.ObjectId();
      const res = await request(app)
        .post('/api/practice/soft-skill/start')
        .send({ topicId: randomId });
      expect(res.status).toBe(404);
      expect(res.body.error).toBe('Topic not found');
    });

    it('inicia el escenario de consultoría y retorna el rol del cliente y la pregunta inicial', async () => {
      const topic = await Topic.create({
        title: 'Microservicios vs Monolito Modular',
        category: 'soft_skill',
        type: 'theory',
      });

      const res = await request(app)
        .post('/api/practice/soft-skill/start')
        .send({ topicId: topic._id });

      expect(res.status).toBe(200);
      expect(res.body.topicId).toBe(topic._id.toString());
      expect(res.body.role).toBeDefined();
      expect(res.body.avatar).toBeDefined();
      expect(res.body.scenario).toContain('El cliente quiere');
      expect(res.body.initialQuestion).toContain('¿Por qué');
    });
  });

  describe('POST /api/practice/soft-skill/reply', () => {
    it('retorna 400 si falta userAudioTranscript o topicId', async () => {
      const res = await request(app)
        .post('/api/practice/soft-skill/reply')
        .send({ topicId: '123' });
      expect(res.status).toBe(400);
      expect(res.body.error).toContain('required');
    });

    it('maneja el turno intermedio (1 o 2) devolviendo la réplica escéptica del stakeholder', async () => {
      const topic = await Topic.create({
        title: 'Estrategia de Caching y Consistencia en Redis',
        category: 'soft_skill',
        type: 'practice',
      });

      const res = await request(app)
        .post('/api/practice/soft-skill/reply')
        .send({
          topicId: topic._id,
          role: 'Tech Lead Escéptico',
          conversationHistory: [
            { speaker: 'ai', text: '¿Por qué agregar Redis si PostgreSQL ya tiene cache de buffers?' },
          ],
          userAudioTranscript: 'Redis nos permite desacoplar consultas pesadas de analytics y proteger la base de datos primaria.',
        });

      expect(res.status).toBe(200);
      expect(res.body.isFinalTurn).toBe(false);
      expect(res.body.role).toBe('Tech Lead Escéptico');
      expect(res.body.reply).toBeDefined();
      expect(res.body.reply.length).toBeGreaterThan(10);
    });

    it('maneja el turno final (turno 3 de usuario): emite veredicto formal, actualiza SRS y persiste en SessionLog', async () => {
      const topic = await Topic.create({
        title: 'Defensa de Trade-Offs en Migración Cloud',
        category: 'soft_skill',
        type: 'practice',
        srsStage: 0,
        easeFactor: 2.5,
        intervalDays: 0,
      });

      const conversationHistory = [
        { speaker: 'ai', text: '¿Por qué no posponemos la migración?' },
        { speaker: 'user', text: 'Porque el costo de mantenimiento actual supera la inversión en la nube.' },
        { speaker: 'ai', text: 'Pero la migración tomará 3 meses según tu estimación.' },
        { speaker: 'user', text: 'Podemos hacer una migración por fases empezando por el servicio no crítico.' },
        { speaker: 'ai', text: '¿Qué pasa si hay downtime durante el corte de tráfico?' },
      ];

      const res = await request(app)
        .post('/api/practice/soft-skill/reply')
        .send({
          topicId: topic._id,
          role: 'Product Manager',
          conversationHistory,
          userAudioTranscript:
            'Usaremos un despliegue Blue/Green con DNS ponderado y rollback inmediato si los errores 5xx suben del 0.1%, asegurando cero interrupción para los clientes.',
        });

      expect(res.status).toBe(200);
      expect(res.body.isFinalTurn).toBe(true);
      expect(res.body.score).toBe(4);
      expect(res.body.feedback).toBeDefined();
      expect(res.body.businessClarity).toBeDefined();
      expect(res.body.tradeOffDefense).toBeDefined();
      expect(res.body.assertivenessScore).toBe(4);
      expect(Array.isArray(res.body.missingTradeoffs)).toBe(true);
      expect(Array.isArray(res.body.strengths)).toBe(true);
      expect(res.body.srsStage).toBe(1);
      expect(res.body.intervalDays).toBe(1);
      expect(res.body.sessionLogId).toBeDefined();

      // Verificar persistencia en Topic
      const updatedTopic = await Topic.findById(topic._id);
      expect(updatedTopic.srsStage).toBe(1);
      expect(updatedTopic.history.length).toBe(1);
      expect(updatedTopic.history[0].score).toBe(4);

      // Verificar persistencia en SessionLog
      const log = await SessionLog.findById(res.body.sessionLogId);
      expect(log).not.toBeNull();
      expect(log.topicId.toString()).toBe(topic._id.toString());
      expect(log.score).toBe(4);
      expect(log.assertivenessScore).toBe(4);
      expect(log.businessClarity).toContain('SLA');
      expect(log.conversationHistory.length).toBe(6); // 5 previos + 1 final de usuario
    });
  });
});
