import mongoose from "mongoose";

const includesSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    default: {
        type: Boolean
    }
});

export const IncludesModel = mongoose.model('includes', includesSchema)
