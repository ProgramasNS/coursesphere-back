import express from 'express';
import sequelize from './config/db.js';
import UserRoutes from './routes/UserRoutes.js';
import LessonRoutes from './routes/LessonRoutes.js';
import CourseRoutes from './routes/CourseRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

const allowedOrigins = process.env.CORS_ORIGIN 
    ? process.env.CORS_ORIGIN.split(',')
    : ['http://localhost:5173', 'http://localhost:3000'];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Rotas
app.use('/api/user', UserRoutes);
app.use('/api/course', CourseRoutes);
app.use('/api/lesson', LessonRoutes);

sequelize.sync();

export default app;