import express from 'express';
import dotenv from 'dotenv';
import { authRoutes, cinemaSessionRoutes, seatRoutes } from './routes';
import { securityMiddleware } from './middlewares/security';
import http from 'http';
import { WebSocketServer } from 'ws';
import { execSync } from 'child_process';
import { seed } from './shared/utils/seed-function';

dotenv.config();

const app = express();

const server = http.createServer(app);
const wss = new WebSocketServer({ server });
app.use(express.json());

securityMiddleware(app);

app.use('/api', cinemaSessionRoutes);
app.use('/api', seatRoutes(wss));
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => {
  execSync(`npx prisma migrate deploy`, {
    stdio: 'inherit',
  });

  seed();

  console.log(`Server is running on port ${PORT}`);
});
