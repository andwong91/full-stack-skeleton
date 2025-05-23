import cors from 'cors';
import { config } from 'dotenv';
import express from 'express';
import { errorHandler } from './middlewares/errorHandler';
import type { ServerError } from './types';

config({
  path: '../.env',
});

const app = express();
const port = +process.env.PORT! || 3001;

app.use(cors());
app.use(express.json());

app.get('/api', (_req, res) => {
  res.json({ message: 'Hello from the Express backend!' });
});

// 404 handler for undefined routes
app.use((_req, res) => {
  const error: ServerError = {
    log: '404 - Route not found',
    status: 404,
    message: { err: '404 - Route not found' },
  };
  console.error(error.log);
  res.status(404).json(error);
});

// Global error handler - must be the last middleware
app.use(errorHandler);

async function startServer() {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}

startServer();
