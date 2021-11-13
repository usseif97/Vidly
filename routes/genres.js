import express from 'express'; // express is a function
import { Genre, validateGenre } from '../models/genre.js'

const router = express.Router();

// GET all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

// GET a genre
router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    // check genre exist or not
    if(!genre)
        return res.status(404).send('Genre not found !!');
    
    res.send(genre);
});

// ADD a genre (Body)
router.post('/', async (req, res) => {
    /* ** validate the request ** */
    const result = validateGenre(req.body);
    if(result.error){
        // Bad request
        return res.status(400).send(result.error.details[0].message);
    }

    /* ** Define a new record ** */
    const genre = new Genre({
        name: req.body.name,
    });

    /* ** Add to the Database ** */
    await genre.save();
    res.send(genre);
});

// UPDATE a genre (Body)
router.put('/:id', async (req, res) => {
    /* ** validate the request ** */
    const result = validateGenre(req.body);
    if(result.error){
        // Bad request
        return res.status(400).send(result.error.details[0].message);
    }

    /* ** update the record ** */
    // update
    const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    // check genre exist or not
    if(!genre){
        return res.status(404).send('Genre not found !!');
    }    
    res.send(genre);
});

// DELETE a genre
router.delete('/:id', async (req, res) => {
    // delete
    const genre = await Genre.findByIdAndRemove(req.params.id);
    // check genre exist or not
    if(!genre){
        return res.status(404).send('Genre not found !!');
    }
    res.send(genre);
});

export default router;