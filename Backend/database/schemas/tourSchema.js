import mongoose from "mongoose";
import { Schema } from 'mongoose'
import { IncludesModel } from "./includesSchema.js";


const tourSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    meeting_point: {
        latitude: {
            type: Number,
            required: true
        },
        longitude: {
            type: Number,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true,
    },
    includes: {
        type: [{ type: Schema.Types.ObjectId, ref: 'includes' }],
        validate: {
            validator: async function (values) {
                //1

                // for (let i = 0; i < values.length; i++) {
                //     console.log(values[i])
                //     const exists = await IncludesModel.exists({ _id: values[i] })
                //     if (!exists) {
                //         return false
                //     }
                // }
                // return true

                //2
                // const includes = await IncludesModel.find({ _id: { $in: values } })
                // console.log(includes)
                // return includes.length === values.length

                //3
                const count = await IncludesModel.countDocuments({ _id: { $in: values } })
                return count === values.length
            },
            message: 'include not found'
        }
    },
    excludes: {
        type: [Schema.Types.ObjectId],
        ref: 'excludes',
    },
    highlights: {
        type: [String]
    },
    gallery: {
        type: [String]
    },
    featured_image: {
        type: String
    },
    additional_info: {
        group_size: {
            type: String
        },
        recommended_gear: {
            type: [String]
        },
        age_restriction: {
            type: String
        },
        meeting_time: {
            type: String
        },
        language: {
            type: [Schema.Types.ObjectId],
            ref: 'languages',
        },
        clothing_advice: {
            type: String
        },
        family_friendly: {
            type: Boolean
        },
        best_season: {
            type: String
        },
        recommended_items: {
            type: [String]
        }
    }
});

export const TourModel = mongoose.model('tours', tourSchema)
