import mongoose from 'mongoose'; // mongoose is a function
import moment from 'moment'; // moment is a function
import Joi from 'joi';  // Joi is a class
import JoiObjectId from 'joi-objectid';
Joi.objectId = JoiObjectId(Joi);

const rentalSchema = new mongoose.Schema({
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
        maxlength: 100
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
  dateOut: {
    type: Date, 
    required: true,
    default: Date.now
  },
  dateReturned: { // set by the server
    type: Date
  },
  rentalFee: { // set by the server (no.OfDays * movie.dailyRentalRate)
    type: Number, 
    min: 0
  },
});

rentalSchema.statics.lookup = function(customerId, movieId) {  // static method
  return this.findOne({
    'customer._id': customerId,
    'movie._id': movieId,
  });
}

rentalSchema.methods.return = function() { // instance method
  this.dateReturned = new Date();

  const rentalDays = moment().diff(this.dateOut, 'days');
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

export const Rental = mongoose.model('Rental', rentalSchema);

// validate the request
export function validateRental(rental) {
  const schema = Joi.object({
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  });
  return schema.validate(rental);
}