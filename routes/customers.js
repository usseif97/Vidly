import express from 'express'; // express is a function
import { Customer, validateCustomer } from '../models/customer.js'
import authorization from '../middleware/authorization.js';
import admin from '../middleware/admin.js';
import asyncMiddleware from '../middleware/async.js';

const router = express.Router();

// GET all customers
router.get('/', asyncMiddleware(async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
}));

// GET a customer
router.get('/:id', asyncMiddleware(async (req, res) => {
    const customer = await Customer.findById(req.params.id);
    // check customer exist or not
    if(!customer)
        return res.status(404).send('Customer not found !!');
    
    res.send(customer);
}));

// ADD a customer (Body)
router.post('/', authorization, asyncMiddleware(async (req, res) => {
    /* ** validate the request ** */
    const result = validateCustomer(req.body);
    if(result.error){
        // Bad request
        return res.status(400).send(result.error.details[0].message);
    }
    /* ** Define a new record ** */
    const customer = new Customer({
        name: req.body.name,
        phone: req.body.phone,
        isGold: req.body.isGold,
    });

    /* ** Add to the Database ** */
    await customer.save();
    res.send(customer);
}));

// UPDATE a customer (Body)
router.put('/:id', authorization, asyncMiddleware(async (req, res) => {
    /* ** validate the request ** */
    const result = validateCustomer(req.body);
    if(result.error){
        // Bad request
        return res.status(400).send(result.error.details[0].message);
    }

    /* ** update the record ** */
    // update
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        { 
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold,
        },
        { new: true });
    // check customer exist or not
    if(!customer)
        return res.status(404).send('Customer not found !!');
    
    res.send(customer);
}));

// DELETE a customer
router.delete('/:id', [authorization, admin], asyncMiddleware(async (req, res) => {
    // delete
    const customer = await Customer.findByIdAndRemove(req.params.id);
    // check customer exist or not
    if(!customer)
        return res.status(404).send('Customer not found !!');
    
    res.send(customer);
}));

export default router;