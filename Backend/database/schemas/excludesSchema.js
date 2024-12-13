import mongoose from "mongoose";

const excludesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    }
});

export const ExcludesModel = mongoose.model('excludes', excludesSchema)
