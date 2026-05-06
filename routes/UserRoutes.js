import express from 'express';
import { registerUser, loginUser } from '../controllers/UserController.js';

const route = express.Router();

route.post('/', registerUser);
route.post('/login', loginUser);

export default route;