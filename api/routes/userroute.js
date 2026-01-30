import Router from 'express';
import { userdatainsertion,getuserdata  } from '../controllers/usercontrollers.js';
const userRoutes = Router();
userRoutes.post('/insertuserdata', userdatainsertion);
userRoutes.get('/getuserdata', getuserdata);
export default userRoutes;