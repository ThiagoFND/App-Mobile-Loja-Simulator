'use strict'
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
mongoose.connect("mongodb://127.0.0.1:27017/supermarket")

const PORT = process.env.port || 3000

const app = express()
const userRouter = require('./src/routers/userRouter')
const productRouter = require('./src/routers/productRouter')
const middlewareAuth = require('./src/services/middlewareAuth')

app.use(express.json())
app.use(middlewareAuth)
app.use(userRouter)
app.use(productRouter)

app.listen(PORT, () => {
    console.log('Seu servidor está online na porta', PORT)
})
