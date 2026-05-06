import express from 'express';
import { createLessons, listLessons, updateLesson, deleteLesson } from "../controllers/LessonController.js";
import authMiddleware from '../middlewares/middleware.js';

const route = express.Router();

route.post('/', authMiddleware, createLessons);
route.get('/course/:courseId', authMiddleware, listLessons);
route.put('/:id', authMiddleware, updateLesson);
route.delete('/:id', authMiddleware, deleteLesson);

export default route;