import mongoose from 'mongoose'; // mongoose is a function

function validateObjectId(req, res, next){
    // check ObjectID is valid or not
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).send('Invalid ID');
    }
    // pass control to the next request processing pipeline (Route Handler)
    next();
}

export default validateObjectId;