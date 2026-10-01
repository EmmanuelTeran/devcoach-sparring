import express from 'express';
import cors from 'cors';
import { healthRouter } from './routes/health.js';
import { topicsRouter } from './routes/topics.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', healthRouter);
app.use('/api/topics', topicsRouter);
