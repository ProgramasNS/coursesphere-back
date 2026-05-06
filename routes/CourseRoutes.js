import express from 'express';
import { createCourse, updateCourse, deleteCourse, listCourses } from "../controllers/CourseController.js";
import authMiddleware from "../middlewares/middleware.js";

const route = express.Router();

route.get('/list', authMiddleware, listCourses);
route.post('/', authMiddleware, createCourse);
route.put('/:id', authMiddleware, updateCourse);
route.delete('/:id', authMiddleware, deleteCourse);

export default route;
 