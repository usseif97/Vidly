import mongoose from 'mongoose'; // mongoose is a function
import { logger } from '../startup/logging.js';
import config from 'config'; // config is a function

function db() {
    // mongoDB connection
    const db = config.get('db');
    mongoose.connect(db) //'mongodb://localhost/vidly'
    .then(() =>  logger.info(`Connected to ${db}`));
}

export default db;
