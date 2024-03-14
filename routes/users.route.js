import express from 'express'
import { getUser, loginUser, registerUser } from '../controllers/users.controller.js'

const userRouter = express.Router()

userRouter.get('/',(req,res)=>getUser(req,res))
userRouter.post('/register',(req,res)=>registerUser(req,res))
userRouter.post('/login',(req,res)=>loginUser(req,res))

export default userRouter