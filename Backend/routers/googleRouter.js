import express from "express"
import jwt from 'jsonwebtoken'
import { UserModel } from "../database/schemas/userSchema.js"

const googleRouter = express.Router()

const clientId = process.env.GOOGLE_CLIENT_ID
const url = process.env.GOOGLE_CALLBACK_URL
const clientSecret = process.env.GOOGLE_CLIENT_SECRET

googleRouter.get('/', (req, res) => {

    const redirectUri = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${url}&response_type=code&scope= email profile`
    res.redirect(redirectUri)
})

googleRouter.get('/callback', async (req, res) => {
    try {
        const body = {
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            redirect_uri: url,
            code: req.query.code,
        };

        const response = await fetch('https://oauth2.googleapis.com/token', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        const responseOauth = await response.json();
        const token = responseOauth.id_token;
        const user = jwt.decode(token);

        if (!user || !user.email) {
            return res.status(400).send('Invalid user data');
        }

        const existingUser = await UserModel.findOne({ email: user.email });
        if (existingUser) {
            return res.redirect('http://localhost:5173/google/success?token=' + token + '&id=' + existingUser._id + '&username=' + existingUser.username + '&email=' + existingUser.email);
        }

        const newUser = new UserModel({
            username: user.name,
            email: user.email,
            password: user.at_hash,
        });
        await newUser.save();

        res.redirect('http://localhost:5173/google/success?token=' + token + '&id=' + newUser._id + '&name=' + newUser.username + '&email=' + newUser.email);
    } catch (error) {
        console.error('Error during Google OAuth callback:', error);
        res.status(500).send('Internal Server Error');
    }
});


export default googleRouter;