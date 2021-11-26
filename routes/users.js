import express from 'express'; // express is a function
import bcrypt from 'bcrypt'; // bcrypt is a function
import _ from 'lodash'; // _ is a class
import { User, validateUser } from '../models/user.js'
import authorization from '../middleware/authorization.js';
import validate from '../middleware/validate.js';
import admin from '../middleware/admin.js';
import asyncMiddleware from '../middleware/async.js';
import validateObjectId from '../middleware/validateObjectId.js';

const router = express.Router();

// GET all users
router.get('/', asyncMiddleware(async (req, res) => {
    const users = await User.find().sort('name');
    res.send(users);
}));

// GET a user
router.get('/:id', validateObjectId, asyncMiddleware(async (req, res) => {   
    const user = await User.findById(req.params.id);
    // check user exist or not
    if(!user)
        return res.status(404).send('User not found !!');
    
    res.send(user);
}));

// GET the cuurent user
/*router.get('/me', authorization, async (req, res) => {
    //const x = req.user._id;
    //const currentUser = await User.findById(x.str).select('-password');
    //const currentUser = await User.findById(req.params.user._id).select('-password');
    //res.send(currentUser);
});*/

// CREATE a new user 'Register' (Body)
router.post('/', validate(validateUser), asyncMiddleware(async (req, res) => {
     /* ** Query the Database ** */
    // check the user arleady exist or not
    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User arleady Registered !!');
    
    /* ** Define a new record ** */
    user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        isAdmin: req.body.isAdmin,
    });

    /* ** Hash the user password (salt) ** */
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    /* ** Add to the Database ** */
    await user.save();

    /* ** Generate Json Web Token (payload & private key) ** */
    const token = user.generateAuthToken();

    /* ** Send JWT in the header ** */
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
}));

// UPDATE a user (Body)
router.put('/:id', [authorization, validateObjectId, validate(validateUser)], asyncMiddleware(async (req, res) => {
    /* ** update the record ** */
    // update
    const user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    // check user exist or not
    if(!user){
        return res.status(404).send('User not found !!');
    }    
    res.send(user);
}));

// DELETE a user
router.delete('/:id', [authorization, validateObjectId, admin], asyncMiddleware(async (req, res) => {
    // delete
    const user = await User.findByIdAndRemove(req.params.id);
    // check user exist or not
    if(!user){
        return res.status(404).send('User not found !!');
    }
    res.send(user);
}));

export default router;