import express from "express"
import authRouter from "./authRouter.js"
import toursRouter from "./toursRouter.js"
import uploadRouter from "./uploadRouter.js"

const apiRouter = express.Router()

apiRouter.use('/tours', toursRouter)
apiRouter.use('/auth', authRouter)
apiRouter.use('/upload', uploadRouter)


export default apiRouter;