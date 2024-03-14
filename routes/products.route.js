import express from 'express'

const productRouter = express.Router()

productRouter.get('/all',(req,res))
productRouter.patch('/update',(req,res))

export default productRouter