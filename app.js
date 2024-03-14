import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './configs/DB.js'
import { fetchAndStoreData } from './utils/mockApi.js'
import userRouter from './routes/users.route.js'
import productRouter from './routes/products.route.js'
import reviewRouter from './routes/reviews.route.js'
const app=express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use(cookieParser())

app.use("/api/user/",userRouter)
app.use("/api/product/",productRouter)
app.use("/api/review/",reviewRouter)


app.listen(3000,async ()=>{
    console.log("Server starting on http://localhost:3000");
    await connectDB()
    // await fetchAndStoreData()
})