import express from 'express'
import { ExcludesModel } from "../database/schemas/excludesSchema.js"

const excludesRouter = express.Router()

excludesRouter.post("/", async (req, res) => {
    try {
        const excludes = req.body.excludes;
        if (!Array.isArray(excludes) || excludes.length === 0) {
            return res.status(400).json({ error: "La lista degli excludes è vuota o non valida" });
        }

        const excludeIds = await Promise.all(
            excludes.map(async (title) => {
                const existingExclude = await ExcludesModel.findOne({ title });
                if (existingExclude) {
                    return existingExclude._id
                }
                const newExclude = new ExcludesModel({ title });
                await newExclude.save()
                return newExclude._id
            })
        );

        res.status(200).json({ excludes: excludeIds });
    } catch (error) {
        console.error("Errore nel salvataggio degli excludes", error);
        res.status(500).json({ error: "Errore nel salvataggio degli excludes" });
    }
});


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