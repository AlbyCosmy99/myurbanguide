import express from 'express'
import { TourModel } from "../database/schemas/tourSchema.js"
import includesRouter from "./includesRouter.js"
import excludesRouter from "./excludesRouter.js"
import languagesRouter from "./languagesRouter.js"
import userToursRouter from "./userToursRouter.js"
import mongoSanitize from 'mongo-sanitize'
import multer from "multer"
import { IncludesModel } from "../database/schemas/includesSchema.js"
import { ExcludesModel } from "../database/schemas/excludesSchema.js"
import { newExcludes, newIncludes } from "../services/toursService.js"

const tourRouter = express.Router()

tourRouter.use('/includes', includesRouter)
tourRouter.use('/excludes', excludesRouter)
tourRouter.use('/languages', languagesRouter)
tourRouter.use('/usertours', userToursRouter)

tourRouter.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 6
        const skip = (page - 1) * limit

        const tours = await TourModel.find().skip(skip).limit(limit);
        const total = await TourModel.countDocuments();

        res.status(200).json({
            total,
            page,
            totalPages: Math.ceil(total / limit),
            data: tours,
        });
    } catch (err) {
        res.status(500).json({ error: 'Errore del server', message: err.message });
    }
});


tourRouter.get('/:id', async (req, res) => {
    res.status(200).json(
        await TourModel.findOne({ _id: req.params.id }).populate([
            { path: 'includes' },
            { path: 'excludes' }
        ])
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


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = "./public/Images";
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9) + "-";
        cb(null, uniqueSuffix + file.originalname.replaceAll(' ', '-'));
    }
});

const uploadImg = multer({ storage: storage }).array("photos", 12);

tourRouter.post("/", uploadImg, async (req, res) => {
    const bodySanitized = mongoSanitize(req.body)

    try {

        const includes = JSON.parse(req.body.includes);
        const excludes = JSON.parse(req.body.excludes);
        const meetingPoint = JSON.parse(req.body.meeting_point);
        const fileUploaded = req.files;

        if (!fileUploaded) {
            return res.status(400).json({
                message: "No file"
            });
        }

        const includeIds = await newIncludes(includes);
        const excludeIds = await newExcludes(excludes);

        const body = {
            ...bodySanitized,
            includes: includeIds,
            excludes: excludeIds,
            featured_image: fileUploaded[0].path,
            gallery: fileUploaded.map(file => file.path),
            meeting_point: meetingPoint,
        };

        const newTour = new TourModel(body);
        await newTour.save();
        return res.status(201).json(newTour);

    } catch (error) {
        return res.status(400).json({
            error: "Cannot save the tour to db.",
            details: error.message
        });
    }

})

export default tourRouter;

