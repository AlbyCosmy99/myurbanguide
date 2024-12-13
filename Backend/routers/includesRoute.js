import express from 'express'
import { IncludesModel } from "../database/schemas/includesSchema.js"

const includesRoute = express.Router()

includesRoute.post("/", async (req, res) => {
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

includesRoute.get('/', async (req, res) => {
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

includesRoute.get('/default', async (req, res) => {
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

export default includesRoute