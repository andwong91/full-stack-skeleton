import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';
import { ServerError } from './types.js';

// Load environment variables
dotenv.config({
  path: '../.env',
});

const app = express();
const port = process.env.PORT || 3000;

// Middleware
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


app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
