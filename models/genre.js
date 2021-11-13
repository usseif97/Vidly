import mongoose from 'mongoose'; // mongoose is a function
import Joi from 'joi';  // Joi is a class

export const genreSchema = new mongoose.Schema({
    name: { // compulsory
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
    },
  });

export const Genre = mongoose.model('Genre', genreSchema);

// validate the request
export function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(genre);
}