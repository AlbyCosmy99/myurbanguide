import mongoose from "mongoose";

const languagesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    }
});

export const LanguagesModel = mongoose.model('languages', languagesSchema)
