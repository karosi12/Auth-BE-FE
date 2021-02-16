import UserCtrl from '../controllers/User'
import {Router} from 'express';
export const userRouter = Router();

userRouter.post('/signup', UserCtrl.signUp)
userRouter.post('/login', UserCtrl.login)
userRouter.post('/find_user', UserCtrl.findUser)
userRouter.post('/forgot_password', UserCtrl.forgotPasswordRequest)
userRouter.post('/reset_password', UserCtrl.resetPassword)