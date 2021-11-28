import express from 'express';
import path from 'path';
import cors, { CorsOptions } from 'cors';
import authRoutes from './api/auth/auth.routes';
import heroRoutes from './api/hero/hero.routes';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import expressSession from 'express-session';
import { logger } from './services/logger.service';

const app = express();
const port = process.env.PORT || 3030;

app.use(express.json());
dotenv.config();
const session = expressSession({
  secret: process.env.SESSION_SECRET || 'some secret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false },
});
app.use(session);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, 'public')));
} else {
  const corsOptions: CorsOptions = {
    credentials: true,
    origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000'],
  };
  app.use(cors(corsOptions));
}

app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);

mongoose.connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.jxpry.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
);

app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(path.join(__dirname, 'public', 'index.html'));

  logger.info('Server is running on port: ' + port);
});
