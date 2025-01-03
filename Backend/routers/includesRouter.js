import express from 'express'
import { IncludesModel } from "../database/schemas/includesSchema.js"

const includesRouter = express.Router()

includesRouter.post("/", async (req, res) => {
    try {
        const includes = req.body.includes
        const createdIncludes = await IncludesModel.insertMany(
            includes.map(title => ({ title }))
        );
        res.status(200).json({ includes: createdIncludes })
    } catch (error) {
        res.status(500).json({ error: "Errore nel salvataggio degli includes" })
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