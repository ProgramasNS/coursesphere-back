import express from 'express' //Módulo do Express
import sequelize from './config/db.js';
import UserRoutes from './routes/UserRoutes.js';
import LessonRoutes from './routes/LessonRoutes.js'
import CourseRoutes from './routes/CourseRoutes.js'
import dotenv from 'dotenv'; //Esse módulo serve para conectar o middleware à chave no arquivo env.
import cors from 'cors';

//Criação do app e uso dos módulos
const app = express();
app.use(cors({
    origin: 'http://localhost:5173',  
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json())


//Rotas
app.use('/api/user', UserRoutes);
app.use('/api/course', CourseRoutes);
app.use('/api/lesson', LessonRoutes)

sequelize.sync();

export default app;