import express from 'express'; // express is a function
import mongoose from 'mongoose'; // mongoose is a function
//import Fawn from 'fawn'; // fawn is a class
import { Rental, validateRental } from '../models/rental.js'
import { Customer } from '../models/customer.js'
import { Movie } from '../models/movie.js'
import authorization from '../middleware/authorization.js';
import validate from '../middleware/validate.js';
import admin from '../middleware/admin.js';
import asyncMiddleware from '../middleware/async.js';
import validateObjectId from '../middleware/validateObjectId.js';

const router = express.Router();

//Fawn.init(mongoose);

// GET all rentals
router.get('/', [authorization, admin], asyncMiddleware(async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut'); // DES
    res.send(rentals);
}));

// GET a rental
router.get('/:id', [validateObjectId, authorization, admin], asyncMiddleware(async (req, res) => {
    const rental = await Rental.findById(req.params.id);
    // check rental exist or not
    if(!rental)
        return res.status(404).send('Rental not found !!');
    
    res.send(rental);
}));

// ADD a rental (Body) <<<<
router.post('/', [authorization, validate(validateRental)], asyncMiddleware(async (req, res) => {
    /* ** Query the Database ** */
    // check & get the Customer
    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer !!');
    // check & get the Movie
    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie !!');
    if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock..');

    /* ** Define a new record ** */
    const rental = new Rental({
        customer: {
            _id: customer._id,
            name: customer.name, 
            phone: customer.phone
          },
          movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
          },
    });

    /* ** Add to the Database ** */
    try {
        // 2 phase commit (Transaction)
        /*new Fawn.Task()
            .save('rentals', rental)
            .update('movies', {_id: movie._id}, {
                $inc: { numberInStock: -1 }
            })
            .run();*/

        await rental.save();
        // decrement number of movie in the stock
        movie.numberInStock--;
        movie.save();

        res.send(rental);
    } catch (error){
        res.status(500).send('something failed !!');
    }
}));

export default router;