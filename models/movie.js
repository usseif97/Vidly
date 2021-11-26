import mongoose from 'mongoose'; // mongoose is a function
import Joi from 'joi';  // Joi is a class
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);
import { genreSchema } from './genre.js'

export const Movie = mongoose.model('Movie', new mongoose.Schema({ // embedding
    title: { // compulsory
        type: String,
        required: true,
        minlength: 5,
        maxlength: 100,
        trim: true,
    }, 
    genre: { // compulsory
        type: genreSchema,
        required: true,
    }, 
    numberInStock: { // compulsory
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalRate: { // compulsory
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    description: {
        type: String,
    }, 
    cast: {
        type: String,
    }, 
    image: {
        type: String,
    }, 
    url: {
        type: String,
    }, 
    date: {
        type: String,
    },
    rate: {
        type: String,
    }, 
}));

// validate the request
export function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().min(5).max(100).required(),
        genreId: Joi.objectId().required(),
        numberInStock: Joi.number().min(0).max(255).required(),
        dailyRentalRate: Joi.number().min(0).max(255).required(),
        description: Joi.string(),
        cast: Joi.string(),
        image: Joi.string(),
        url: Joi.string(),
        date: Joi.string(),
        rate: Joi.string(),
    });
    return schema.validate(movie);
};