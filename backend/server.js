import express from 'express'
import dotenv from "dotenv"

import authRoutes from "./routes/auth.routes.js"
import connecToMongoDB from './db/connectToMongoDB.js'
const app = express()

dotenv.config()
const PORT = process.env.PORT || 5000

app.get("/", (req,res) =>{
    //root route http://localhost:5000/
    res.send("Hello World!!")
})

app.use("/api/auth",authRoutes)

app.listen(PORT, () => {
    connecToMongoDB()
    console.log(`Server Running on port ${PORT}`)})