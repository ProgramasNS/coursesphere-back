import express from 'express';
import sequelize from './config/db.js';
import UserRoutes from './routes/UserRoutes.js';
import LessonRoutes from './routes/LessonRoutes.js';
import CourseRoutes from './routes/CourseRoutes.js';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// Rotas
app.use('/api/user', UserRoutes);
app.use('/api/course', CourseRoutes);
app.use('/api/lesson', LessonRoutes);

sequelize.sync();

export default app;