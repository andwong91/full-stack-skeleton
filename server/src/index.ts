import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { errorHandler } from './middleware/errorHandler.js';

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

app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
