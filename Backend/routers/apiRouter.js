import express from "express"
import authRouter from "./authRouter.js"
import toursRouter from "./toursRouter.js"

const apiRouter = express.Router()

apiRouter.use('/tours', toursRouter)
apiRouter.use('/auth', authRouter)


export default apiRouter;