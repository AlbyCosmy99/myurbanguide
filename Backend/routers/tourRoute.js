import express from 'express'
import { TourModel } from "../database/schemas/tourSchema.js"
import includesRoute from "./includesRoute.js"
import excludesRoute from "./excludesRoute.js"
import languagesRoute from "./languagesRoute.js"
import userToursRoute from "./userTourRouter.js"

const tourRoute = express.Router()

tourRoute.use('/includes', includesRoute)
tourRoute.use('/excludes', excludesRoute)
tourRoute.use('/languages', languagesRoute)
tourRoute.use('/user', userToursRoute)

tourRoute.get('/', async (req, res) => {
    return res.status(200).json(
        await TourModel.find().populate('includes')
    )
})

tourRoute.get('/:id', async (req, res) => {
    res.status(200).json(
        await TourModel.findOne({ _id: req.params.id })
    )
})

tourRoute.post("/", async (req, res) => {
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

export default tourRoute;