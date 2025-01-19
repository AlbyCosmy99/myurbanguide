import express from 'express'
import { IncludesModel } from "../database/schemas/includesSchema.js"

const includesRouter = express.Router()

includesRouter.get('/', async (req, res) => {
    try {
        return res.status(200).json(
            await IncludesModel.find()
        )
    } catch (err) {
        return res.status(500).json({
            error: "Server error"
        })
    }
})

includesRouter.get('/default', async (req, res) => {
    try {
        return res.status(200).json(
            await IncludesModel.find({ default: true })
        )
    } catch (err) {
        return res.status(500).json({
            error: "Server error"
        })
    }
})

export default includesRouter