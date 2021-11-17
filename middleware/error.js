import { logger } from '../startup/logging.js';

// works only in the request process pipeline (not work during the startup)
function error (error, req, res, next){
    // logging..
    logger.error(error.message, error);
    // 500: internal server error (Server Crashes)
    res.status(500).send('something failed !!');
}

export default error;


/* ** Logging Levels ** */
// error
// warn
// info
// verbose
// debug
// silly