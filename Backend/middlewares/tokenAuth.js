import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const tokenAuth = async (req, res, next) => {
    const authHeader = req?.headers?.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1]
        try {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.GOOGLE_CLIENT_ID,
            });

            const payload = ticket.getPayload()
            req.payload = payload
            return next()

        } catch (googleError) {

            try {
                const payload = jwt.verify(token, process.env.JWT_SECRET)
                req.payload = payload
                return next()

            } catch (jwtError) {

                try {
                    const githubResponse = await fetch('https://api.github.com/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    if (!githubResponse.ok) {
                        throw new Error('GitHub token invalid or expired');
                    }

                    const githubUser = await githubResponse.json();
                    req.payload = githubUser;
                    return next();

                } catch (githubError) {

                    return res.status(401).json({
                        message: 'Invalid token',
                    });
                }
            }
        }
    }

    return res.status(401).json({
        message: 'Missing or invalid token',
    });
};

export default tokenAuth;
