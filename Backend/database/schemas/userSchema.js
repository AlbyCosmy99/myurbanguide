import mongoose, { Schema } from "mongoose";

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    surname: {
        type: String
    },
    birthday: {
        type: Date
    }
})

export const UserModel = mongoose.model('users', userSchema)