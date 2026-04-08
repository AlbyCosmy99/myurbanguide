import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import 'dotenv/config'
import apiRouter from "./routers/apiRouter.js"
import rateLimit from "express-rate-limit"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = express()
const port = process.env.PORT || 3030

// Using connection string from env or local default
//express-rate-limit
const limiter = rateLimit({
    windowMs: 30 * 1000, //5 minuti,
    max: 100, //numero massimo di richieste che si possono fare nell'arco temporale impostato
    message: "Hai fatto troppe richieste in breve tempo"
})

server.use(cors())
server.use(express.json())
server.use(limiter)

server.use('/api', apiRouter)

server.use('/public', express.static('public'));

server.use(express.static(path.join(__dirname, '../Frontend/dist')));

server.get(/^(?!\/api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});


const mongouri = process.env.MONGODB_URI || 'mongodb://localhost:27017/myurbanguide'

mongoose.connect(mongouri)
    .then(() => {
        server.listen(port, "0.0.0.0", () => {
            console.log('listening on port', port)
        })
    })
    .catch((err) => {
        console.log('Failed to connect to database:', err)
    })