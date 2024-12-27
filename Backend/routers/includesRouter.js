import express from 'express'
import { IncludesModel } from "../database/schemas/includesSchema.js"

const includesRouter = express.Router()

includesRouter.post("/", async (req, res) => {
    try {
        const newIncludesTour = new IncludesModel(req.body)
        await newIncludesTour.save()

        return res.status(201).json(newIncludesTour)

    } catch (error) {
        return res.status(400).json({
            error: "Cannot save the tour to db.",
            details: error.message
        })
    }
})

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