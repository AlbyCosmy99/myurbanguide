import express from 'express'
import { TourModel } from "../database/schemas/tourSchema.js"

const userToursRouter = express.Router()

userToursRouter.get('/:userId', async (req, res) => {
    res.status(200).json(
        await TourModel.find({ user: req.params.userId })
    )
})

export default userToursRouter