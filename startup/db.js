import mongoose from 'mongoose'; // mongoose is a function
import { logger } from '../startup/logging.js';

function db() {
    // mongoDB connection
    mongoose.connect('mongodb://localhost/vidly')
    .then(() =>  logger.info('Connected to MongoDB...'))
}

export default db;
