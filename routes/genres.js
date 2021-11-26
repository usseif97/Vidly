import express from 'express'; // express is a function
import { Genre, validateGenre } from '../models/genre.js'
import authorization from '../middleware/authorization.js';
import validate from '../middleware/validate.js';
import admin from '../middleware/admin.js';
import asyncMiddleware from '../middleware/async.js';
import validateObjectId from '../middleware/validateObjectId.js';

const router = express.Router();

// GET all genres
router.get('/', asyncMiddleware(async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
}));

// GET a genre
router.get('/:id', validateObjectId, asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    // check genre exist or not
    if(!genre)
        return res.status(404).send('Genre not found !!');
    
    res.send(genre);
}));

// ADD a genre (Body)
router.post('/', [authorization, validate(validateGenre)], asyncMiddleware(async (req, res) => {
    /* ** Define a new record ** */
    const genre = new Genre({
        name: req.body.name,
    });

    /* ** Add to the Database ** */
    await genre.save();
    res.send(genre);
}));

// UPDATE a genre (Body)
router.put('/:id', [authorization, validateObjectId, validate(validateGenre)], asyncMiddleware(async (req, res) => {
    /* ** update the record ** */
    // update
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    // check genre exist or not
    if(!genre){
        return res.status(404).send('Genre not found !!');
    }    
    res.send(genre);
}));

// DELETE a genre
router.delete('/:id', [authorization, validateObjectId, admin], asyncMiddleware(async (req, res) => {
    // delete
    const genre = await Genre.findByIdAndRemove(req.params.id);
    // check genre exist or not
    if(!genre){
        return res.status(404).send('Genre not found !!');
    }
    res.send(genre);
}));

export default router;