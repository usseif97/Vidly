import mongoose from 'mongoose'; // mongoose is a function
import Joi from 'joi';  // Joi is a class

export const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: { // compulsory
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50,
        trim: true,
    }, 
    phone: { // compulsory
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
    }, 
    isGold: {
        type: Boolean,
        default: false,
    },
}));

// validate the request
export function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(15).required(),
        isGold: Joi.boolean(),
    });
    return schema.validate(customer);
};