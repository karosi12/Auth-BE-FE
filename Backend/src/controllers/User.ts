import JWT from "jsonwebtoken";
import bcrypt from "bcrypt-nodejs";
import { User } from '../models/User';
import Responses from "../helper/responses";
import emailService from "../services/emailService";
const SECRET = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  try {
    const body = req.body;
    body.password = bcrypt.hashSync(body.password, bcrypt.genSaltSync(8), null);
    const user = await User.create(body);
    if(!user) return res.status(400).send(Responses.error(400,'unable to create user')) 
    const tokenData = { id: user.id, fullName: user.fullName };
    const token = await JWT.sign(tokenData, SECRET, {
      expiresIn: process.env.tokenExpiresIn,
    });
    const data = { user, token };
    return res.status(201).send(Responses.success(201, 'user created', data))
  } catch (error) {
    if(error.errors) return res.status(400).send(Responses.error(400,error.errors[0].message))
    return res.status(500).send(Responses.error(500, 'Internal server error'))
  }
}

const login =  async (req, res) => {
  try { 
    const {email, password} = req.body;
    const user = await User.findOne({ where: {email}})
    if(!user) return res.status(400).send(Responses.error(400,'Unauthorized access'))
    const response = bcrypt.compareSync(password, user.password);
    if(!response) return res.status(400).send(Responses.error(400, 'Invalid credentials'))
    const tokenData = { id: user.id, fullName: user.fullName };
    const token = await JWT.sign(tokenData, SECRET, {
      expiresIn: process.env.tokenExpiresIn,
    });
    const data = { user, token };
    return res.status(200).send(Responses.success(200, 'Login successfully', data))
  } catch (error) {
    if(error.errors) return res.status(400).send(Responses.error(400,error.errors[0].message))
    return res.status(500).send(Responses.error(500, 'Internal server error'))
  }
}

const findUser = async (req, res) => {
  try {
    const {email} = req.body;
    const user = await User.findOne({ where: {email}})
    if(!user) return res.status(400).send(Responses.error(400,'user not found'))
    return res.status(200).send(Responses.success(200, 'Fetch user', user));
  } catch (error) {
    if(error.errors) return res.status(400).send(Responses.error(400,error.errors[0].message))
    return res.status(500).send(Responses.error(500, 'Internal server error'))
  }
}

const forgotPasswordRequest =  async (req, res) => {
  try {
    const {email} = req.body
    const tempAlais = process.env.FORGOT_PASSWORD_ALIAS;
    const data = {
      product_name: process.env.BRAND_NAME,
      invite_link: `${process.env.DOMAIN}/reset-password/`,
      user_name: email
    }
    const sendLink = await emailService.sendEmailWithTemplate(email,tempAlais,data);
    if(!sendLink) return res.status(400).send(Responses.error(400, 'Link not sent'))
    return res.status(200).send(Responses.success(200, 'Reset password link sent', null))
  } catch (error) {
    if(error.errors) return res.status(400).send(Responses.error(400,error.errors[0].message))
    return res.status(500).send(Responses.error(500, 'Internal server error'))
  }
}

const resetPassword = async (req, res) => {
  try {
    let {password, email} = req.body
    const user = await User.findOne({ where: {email}})
    if(!user) return res.status(400).send(Responses.error(400,'Unauthorized access')) 
    const response = bcrypt.compareSync(password, user.password);
    if(response) return res.status(400).send(Responses.error(400,'you have used this password before'))
    password = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
    user.password = password;
    await user.save();
    return res.status(200).send(Responses.success(200, 'Password reset', null))
  } catch (error) {
    if(error.errors) return res.status(400).send(Responses.error(400,error.errors[0].message))
    return res.status(500).send(Responses.error(500, 'Internal server error'))
  }
}

export default {signUp, findUser, forgotPasswordRequest, login, resetPassword}