import express from "express";
import { UserModel } from "../database/schemas/userSchema.js";

const githubRouter = express.Router();

const clientId = process.env.OAUTH_GITHUB_CLIENT_ID;
const clientSecret = process.env.OAUTH_GITHUB_CLIENT_SECRET;
const callbackUrl = process.env.NODE_ENV === 'production' ? process.env.PROD_OAUTH_GITHUB_CALLBACK_URL : process.env.DEV_OAUTH_GITHUB_CALLBACK_URL;

githubRouter.get("/", (req, res) => {
    const params = new URLSearchParams({
        client_id: clientId,
        redirect_uri: callbackUrl,
        scope: "read:user user:email",
        allow_signup: "true",
    }).toString();

    const githubLoginUrl = `https://github.com/login/oauth/authorize?${params}`;
    res.redirect(githubLoginUrl);
});

githubRouter.post("/callback", async (req, res) => {
    try {
        const { code } = req.body;

        if (!code) {
            return res.status(400).json({
                error: "Code not provided"
            });
        }

        const params = new URLSearchParams({
            client_id: clientId,
            client_secret: clientSecret,
            code: code,
            redirect_uri: callbackUrl,
        }).toString();

        const tokenResponse = await fetch(`https://github.com/login/oauth/access_token?${params}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        });

        const tokenData = await tokenResponse.json();
        const accessToken = tokenData.access_token;

        if (!accessToken) {
            return res.status(400).json({
                error: "Failed to retrieve access token"
            });
        }

        const userResponse = await fetch("https://api.github.com/user", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const userData = await userResponse.json();

        const emailResponse = await fetch("https://api.github.com/user/emails", {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const emailData = await emailResponse.json();

        let primaryEmail = null;

        if (Array.isArray(emailData) && emailData.length > 0) {
            primaryEmail = emailData[0].email
        } else if (emailData.message) {
            console.error('Error from API:', emailData.message);
        } else {
            console.error('Unexpected response format:', emailData);
        }

        if (!userData || !primaryEmail) {
            return res.status(400).json({
                error: "No user data or primary email",
            });
        }

        const existingUser = await UserModel.findOne({ email: primaryEmail });
        if (existingUser) {
            return res.status(200).json({
                token: accessToken,
                id: existingUser._id,
                username: existingUser.username,
                email: existingUser.email,
            });
        }

        const newUser = new UserModel({
            username: userData.login,
            email: primaryEmail,
            password: primaryEmail,
        });

        await newUser.save();
        res.status(200).json({
            token: accessToken,
            id: newUser._id,
            username: newUser.username,
            email: newUser.email,
        });
    } catch (error) {
        console.error("Error during GitHub OAuth callback:", error);
        res.status(500).send("Internal Server Error");
    }
});

export default githubRouter;
