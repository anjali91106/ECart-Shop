import express from 'express'
import { Login, logOut, Signup } from '../Controller/user.contoller.js';

const userRoutes = express.Router();

userRoutes.post('/sign-up', Signup);
userRoutes.post('/log-in', Login);
userRoutes.post('/log-out', logOut);

export default userRoutes;

