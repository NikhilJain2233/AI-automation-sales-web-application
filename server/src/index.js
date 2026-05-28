import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './routes/auth.js';
import leadsRoutes from './routes/leads.js';
import { isSupabaseConfigured } from './supabase.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(helmet());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173',
    credentials: true
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'ai-agent-workplace-api',
    supabaseConfigured: isSupabaseConfigured
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadsRoutes);

app.use((_req, res) => {
  res.status(404).json({ message: 'Route not found.' });
});

app.listen(port, () => {
  console.log(`API listening on http://localhost:${port}`);
});
