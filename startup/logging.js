import winston from 'winston'; // winston is a function
import 'winston-mongodb'; // winston-mongodb is a function

// winston (Logger) Intialization
export const logger = winston.createLogger({
    'transports': [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logfile.log'
        })
    ]
    /*winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost/vidly', level: 'error'}));*/
});

export function logging(){
    // log uncaught Exceptions (sync exceptions)
    process.on('uncaughtException', (exception) => {
        logger.error(exception.message, exception);
        process.exit(1);
    });

    // log promise Rejections (async exceptions)
    process.on('unhandledRejection', (exception) => {
        logger.error(exception.message, exception);
        process.exit(1);
    });
}
