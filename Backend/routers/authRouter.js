import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from "../database/schemas/userSchema.js"
import tokenAuth from "../middlewares/tokenAuth.js"
import googleRouter from "./googleRouter.js"

const authRouter = express.Router()

authRouter.use('/google', googleRouter)

authRouter.post('/register', async (req, res) => {
    try {
        const newUser = new UserModel(req.body)
        newUser.password = await bcrypt.hash(newUser.password, 10)

        const payload = {
            id: newUser._id,
            username: newUser.username,
            email: newUser.email
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })

        await newUser.save()
        return res.status(201).json(token)
    } catch (error) {
        return res.status(400).json({
            message: 'invalid user type'
        })
    }
})

authRouter.post('/login', async (req, res) => {
    const { email, password } = req.body
    const user = await UserModel.findOne({ email: email })

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        return res.status(400).json({
            message: "invalid credentials"
        })
    }

    const payload = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' })
    return res.status(200).json(token)
})

authRouter.post('/token/check', tokenAuth, async (req, res) => {
    try {
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).json({
            message: 'Unauthorized'
        })
    }
})

export default authRouter
