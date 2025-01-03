import express from 'express'
import { TourModel } from "../database/schemas/tourSchema.js"
import includesRouter from "./includesRouter.js"
import excludesRouter from "./excludesRouter.js"
import languagesRouter from "./languagesRouter.js"
import userToursRouter from "./userToursRouter.js"

const tourRouter = express.Router()

tourRouter.use('/includes', includesRouter)
tourRouter.use('/excludes', excludesRouter)
tourRouter.use('/languages', languagesRouter)
tourRouter.use('/usertours', userToursRouter)

tourRouter.get('/', async (req, res) => {
    return res.status(200).json(
        await TourModel.find().populate('includes')
    )
})

tourRouter.get('/:id', async (req, res) => {
    res.status(200).json(
        await TourModel.findOne({ _id: req.params.id }).populate('includes')
    )
})

tourRouter.delete('/:id', async (req, res) => {
    try {
        const deletedItem = await TourModel.findByIdAndDelete(req.params.id)
        if (!deletedItem) {
            return res.status(404).json({
                message: "Tour not found"
            })
        }
        return res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: "server error"
        })
    }
})

tourRouter.post("/", async (req, res) => {
    try {
        const newTour = new TourModel(req.body)
        await newTour.save()

        return res.status(201).json(newTour)

    } catch (error) {
        return res.status(400).json({
            error: "Cannot save the tour to db.",
            details: error.message
        })
    }
})

export default tourRouter;