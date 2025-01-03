import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import apiRouter from "./routers/apiRouter.js"

const server = express()
const port = 3030

const username = encodeURIComponent(process.env.USR_DB)
const password = encodeURIComponent(process.env.PSW_DB)

server.use(cors())
server.use(express.json())

server.use('/api', apiRouter)

server.use('/public', express.static('public'));

const mongouri = `mongodb+srv://${username}:${password}@cluster0.rbaal.mongodb.net/myurbanguide`

mongoose.connect(mongouri)
    .then(() => {
        server.listen(port, () => {
            console.log('listening on port', port)
        })
    })
    .catch((err) => {
        console.log('Failed to connect to database:', err)
    })