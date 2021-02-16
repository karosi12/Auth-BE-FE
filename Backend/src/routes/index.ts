import {Router} from 'express';
export const route = Router();
import { userRouter } from './userRoute'
import { bookRouter } from './bookRoute';

route.use('/user', userRouter);
route.use('/book', bookRouter);