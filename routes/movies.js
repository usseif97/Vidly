import express from 'express'; // express is a function
import { Movie, validateMovie } from '../models/movie.js'
import { Genre } from '../models/genre.js'
import authorization from '../middleware/authorization.js';
import admin from '../middleware/admin.js';
import asyncMiddleware from '../middleware/async.js';
import validateObjectId from '../middleware/validateObjectId.js';

const router = express.Router();

// GET all movies
router.get('/', asyncMiddleware(async (req, res) => {
    const movies = await Movie.find().sort('name');
    res.send(movies);
}));

// GET a movie
router.get('/:id', validateObjectId, asyncMiddleware(async (req, res) => {    
    const movie = await Movie.findById(req.params.id);
    // check movie exist or not
    if(!movie)
        return res.status(404).send('Movie not found !!');
    
    res.send(movie);
}));

// ADD a movie (Body)
router.post('/', authorization, asyncMiddleware(async (req, res) => {
    /* ** validate the request ** */
    const result = validateMovie(req.body);
    if(result.error){
        // Bad request
        return res.status(400).send(result.error.details[0].message);
    }

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
    });

    /* ** Add to the Database ** */
    await movie.save();
    res.send(movie);
}));

// UPDATE a movie (Body)
router.put('/:id', authorization, asyncMiddleware(async (req, res) => {
    /* ** validate the request ** */
    const result = validateMovie(req.body);
    if(result.error){
        // Bad request
        return res.status(400).send(result.error.details[0].message);
    }

    /* ** Query the Database ** */
    // check & get the Genre
    const genre = await Genre.findById(req.body.genreId);
    if (!genre) return res.status(400).send('Invalid Genre !!');

    /* ** update the record ** */
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
            dailyRentalRate: req.body.dailyRentalRate
        },
        { new: true });

    // check movie exist or not
    if(!movie)
        return res.status(404).send('Movie not found !!');
    
    res.send(movie);
}));

// DELETE a movie
router.delete('/:id', [authorization, admin], asyncMiddleware(async (req, res) => {
    // delete
    const movie = await Movie.findByIdAndRemove(req.params.id);
    // check movie exist or not
    if(!movie)
        return res.status(404).send('Movie not found !!');
    
    res.send(movie);
}));

export default router;