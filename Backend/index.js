import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import tourRoute from "./routers/tourRoute.js"
import authRouter from "./routers/authRouter.js"
import 'dotenv/config'


const server = express()
const port = 3030

const username = encodeURIComponent(process.env.USR_DB)
const password = encodeURIComponent(process.env.PSW_DB)

const corsOptions = {
    origin: 'http://localhost:5173', // Specifica l'origine front-end
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Metodi permessi
    allowedHeaders: ['Content-Type', 'Authorization'], // Header permessi
    credentials: true, // Permette di inviare cookie se necessario
};

// Middleware CORS
server.use(cors(corsOptions));

// Middleware per richieste preflight
server.options('*', cors(corsOptions));

server.use(express.json())

server.use('/tours', tourRoute)
server.use('/users', authRouter)

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