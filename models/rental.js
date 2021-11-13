import mongoose from 'mongoose'; // mongoose is a function
import Joi from 'joi';  // Joi is a class
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);

export const Rental = mongoose.model('Rental', new mongoose.Schema({ // hybrid (refrence & embedding)
  customer: { // compulsory
    type: new mongoose.Schema({
      name: { // compulsory
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      phone: { // compulsory
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
      },
      isGold: {
        type: Boolean,
        default: false
      },     
    }),  
    required: true
  },
  movie: { // compulsory
    type: new mongoose.Schema({
      title: { // compulsory
        type: String,
        required: true,
        trim: true, 
        minlength: 5,
        maxlength: 255
      },
      dailyRentalRate: { // compulsory
        type: Number, 
        required: true,
        min: 0,
        max: 255
      }   
    }),
    required: true
  },
  dateOut: { // set by the server
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { // set by the server
    type: Date
  },
  rentalFee: { // set by the server
    type: Number, 
    min: 0
  },
}));

// validate the request
export function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  });
  return schema.validate(rental);
}