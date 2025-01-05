import express from 'express'
import { IncludesModel } from "../database/schemas/includesSchema.js"

const includesRouter = express.Router()

includesRouter.post("/", async (req, res) => {
    try {
        const includes = req.body.includes;
        if (!Array.isArray(includes) || includes.length === 0) {
            return res.status(400).json({ error: "La lista degli includes è vuota o non valida" });
        }

        const includeIds = await Promise.all(
            includes.map(async (title) => {
                const existingInclude = await IncludesModel.findOne({ title })
                if (existingInclude) {
                    return existingInclude._id
                }
                const newInclude = new IncludesModel({ title })
                await newInclude.save()
                return newInclude._id
            })
        );

        res.status(200).json({ includes: includeIds });
    } catch (error) {
        console.error("Errore nel salvataggio degli includes", error);
        res.status(500).json({ error: "Errore nel salvataggio degli includes" });
    }
});

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