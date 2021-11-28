import express from 'express'; // express is a function
import { Movie, validateMovie } from '../models/movie.js'
import { Genre } from '../models/genre.js'
import authorization from '../middleware/authorization.js';
import validate from '../middleware/validate.js';
import admin from '../middleware/admin.js';
import asyncMiddleware from '../middleware/async.js';
import validateObjectId from '../middleware/validateObjectId.js';

const router = express.Router();

// GET all movies
router.get('/', authorization, asyncMiddleware(async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
}));

// GET a movie
router.get('/:id', [validateObjectId, authorization], asyncMiddleware(async (req, res) => {    
    const movie = await Movie.findById(req.params.id);
    // check movie exist or not
    if(!movie)
        return res.status(404).send('Movie not found !!');
    
    res.send(movie);
}));

// ADD a movie (Body)
router.post('/', [authorization, admin, validate(validateMovie)], asyncMiddleware(async (req, res) => {
    /* ** Query the Database ** */
    // check & get the Genre
    const genre = await Genre.findById(req.body.genreId);
    if(!genre)  return res.status(400).send('Invalid Genre !!');
    
    /* ** Define a new record ** */
    // add movie
    const movie = new Movie({
        title: req.body.title,
        genre: {
            _id: genre._id,
            name: genre.name,
        },
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        description: req.body.description,
        cast: req.body.cast,
        image: req.body.image,
        url: req.body.url,
        date: req.body.date,
        rate: req.body.rate,
    });

    /* ** Add to the Database ** */
    await movie.save();
    res.send(movie);
}));

// UPDATE a movie (Body)
/*router.put('/:id', [authorization, validateObjectId, validate(validateMovie)], asyncMiddleware(async (req, res) => {
    // Query the Database
    // check & get the Genre
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre !!');

    // update the record 
    // update
    const movie = await Movie.findByIdAndUpdate(
        req.params.id,
        { 
            title: req.body.title,
            genre: {
              _id: genre._id,
              name: genre.name
            },
            numberInStock: req.body.numberInStock,
            dailyRentalRate: req.body.dailyRentalRate,
            description: req.body.description,
            cast: req.body.cast,
            image: req.body.image,
            url: req.body.url,
            date: req.body.date,
            rate: req.body.rate,
        },
        { new: true });

    // check movie exist or not
    if(!movie)
        return res.status(404).send('Movie not found !!');
    
    res.send(movie);
}));*/

// DELETE a movie
router.delete('/:id', [authorization, validateObjectId, admin], asyncMiddleware(async (req, res) => {
    // delete
    const movie = await Movie.findByIdAndRemove(req.params.id);
    // check movie exist or not
    if(!movie)
        return res.status(404).send('Movie not found !!');
    
    res.send(movie);
}));

export default router;