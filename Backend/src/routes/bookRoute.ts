import BookCtrl from '../controllers/Book'
import {Router} from 'express';
import authenticate from "../middlewares/authenticate";
import Validator from  '../helper/validateObj'
export const bookRouter = Router();

bookRouter.post('/create', [authenticate, Validator.addBookJoi], BookCtrl.create)
bookRouter.get('/list',authenticate, BookCtrl.list)