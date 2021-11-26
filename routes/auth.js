import express from 'express'; // express is a function
import bcrypt from 'bcrypt'; // bcrypt is a function
import Joi from 'joi';  // Joi is a class
import _ from 'lodash'; // _ is a class
import { User } from '../models/user.js'
import asyncMiddleware from '../middleware/async.js';
import validate from '../middleware/validate.js';

const router = express.Router();


// AUTHENTICATE a user 'Login' (Body)
router.post('/', validate(validateUser), asyncMiddleware(async (req, res) => {
     /* ** Query the Database ** */
    // check the user arleady exist or not
    let user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid email or password !!');

    /* ** Validate the Password ** */
    const isValid = await bcrypt.compare(req.body.password, user.password);
    if(!isValid) return res.status(400).send('Invalid email or password !!');

    /* ** Generate Json Web Token ** */
    const token = user.generateAuthToken();

    res.send(token);
}));

// validate the request
function validateUser(user) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required(),
    });
    return schema.validate(user);
}

export default router;