import mongoose from 'mongoose'; // mongoose is a function
import jwt from 'jsonwebtoken'; // bcrypt is a function
import config from 'config'; // config is a function
import Joi from 'joi';  // Joi is a class

export const userSchema = new mongoose.Schema({
    name: { // compulsory
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
    },
    email: { // compulsory
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: { // compulsory and will be hashed before saving in the Database
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    isAdmin: Boolean,
  });

// it's a part of the user object
userSchema.methods.generateAuthToken = function() {
    return jwt.sign({ _id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
}

export const User = mongoose.model('User', userSchema);

// validate the request
export function validateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
        isAdmin: Joi.boolean(),
    });
    return schema.validate(user);
}

