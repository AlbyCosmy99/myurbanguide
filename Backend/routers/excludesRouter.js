import express from 'express'
import { ExcludesModel } from "../database/schemas/excludesSchema.js"

const excludesRouter = express.Router()

excludesRouter.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            await ExcludesModel.find()
        )
    } catch (err) {
        return res.status(500).json({
            error: "Server error"
        })
    }
})

excludesRouter.get('/default', async (req, res) => {
    try {
        return res.status(200).json(
            await ExcludesModel.find({ default: true })
        )
    } catch (err) {
        return res.status(500).json({
            error: "Server error"
        })
    }
})

export default excludesRouter