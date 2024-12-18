import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { UserModel } from "../database/schemas/userSchema.js"
import tokenAuth from "../middlewares/tokenAuth.js"

const authRouter = express.Router()

authRouter.post('/register', async (req, res) => {
    try {
        const newUser = new UserModel(req.body)
        newUser.password = await bcrypt.hash(newUser.password, 10)

        const payload = {
            id: newUser._id,
            name: newUser.username,
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
        name: user.username,
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

const clientId = '452269264051-km55c7daqfisomksgql2u94g954uf3ma.apps.googleusercontent.com'
const url = 'http://localhost:3030/users/google/callback'
const clientSecret = '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'

authRouter.get('/google', (req, res) => {

    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${url}&response_type=code&scope= email profile`
    res.redirect(redirectUri)
})

authRouter.get('/google/callback', async (req, res) => {
    const body = {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: 'authorization_code',
        redirect_uri: url,
        code: req.query.code
    }

    const token = await fetch('https://oauth2.googleapis.com/token', {
        method: 'POST',
        body: JSON.stringify(body)
    })
    const response = await token.json()
    res.redirect('http://localhost:5173/success?token=' + response.id_token)
})

export default authRouter
