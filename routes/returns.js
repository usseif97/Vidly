import express from 'express'; // express is a function
import { Rental, validateRental } from '../models/rental.js'
import { Movie } from '../models/movie.js';
import authorization from '../middleware/authorization.js';
import validate from '../middleware/validate.js';
import asyncMiddleware from '../middleware/async.js';

const router = express.Router();

/* ** Customer Can Rent Movie only once ** */
// return a rental (Body)
router.post('/', [authorization, validate(validateRental)], asyncMiddleware(async (req, res) => {
     /* ** Query the Database ** */
    // check & get the Rental
    const rental = await Rental.lookup(req.body.customerId, req.body.movieId);

    if(!rental)
        return res.status(404).send('rental not found !!');

    if(rental.dateReturned)
        return res.status(400).send('rental arleady returned !!');

    // set the return date to Now
    // calculate the rental fee (no.OfDays * movie.dailyRentalRate)
    rental.return();
    await rental.save();

    // update the movie stock by increasing the no.of movies by 1
    await Movie.updateOne({ _id: rental.movie._id}, {
        $inc: { numberInStock: 1}
    });

    return res.send(rental);
}));

export default router;