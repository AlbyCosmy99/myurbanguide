import express from "express"
import multer from "multer"

const uploadRouter = express.Router()

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

uploadRouter.post("/", uploadImg, (req, res) => {
    const files = req.files;

    if (!files) {
        console.log('nessun file')
        return res.status(400).json({
            message: "No file"
        });
    }

    return res.status(200).json({
        files
    });
});

export default uploadRouter