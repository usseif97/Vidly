import express from 'express'; // express is a function
import helmet from 'helmet'; // helmet is a function
import morgan from 'morgan'; // morgan is a function
import home from '../routes/home.js'
import genres from '../routes/genres.js'
import customers from '../routes/customers.js'
import movies from '../routes/movies.js'
import rentals from '../routes/rentals.js'
import returns from '../routes/returns.js'
import users from '../routes/users.js'
import auth from '../routes/auth.js'
import error from '../middleware/error.js'

function routes(app) {
    // View Engine that return template HTML to the client
    app.set('view engine', 'pug');
    app.set('views', '../views')

    // Secure Express apps by setting various HTTP headers
    app.use(helmet());

    // Log HTTP requests
    if(app.get('env') === 'development') {
        app.use(morgan('tiny'));
    }

    // Parse the JSON body, then set req.body (Middleware)
    app.use(express.json());

    // Parse the key-value body, then set req.body (Middleware)
    app.use(express.urlencoded({extended: true}));

    // Routes
    app.use('/', home);
    app.use('/api/genres', genres);
    app.use('/api/customers', customers);
    app.use('/api/movies', movies);
    app.use('/api/rentals', rentals); 
    app.use('/api/returns', returns);
    app.use('/api/users', users);
    app.use('/api/auth', auth);
    
    // Error Handling
    app.use(error);
}

export default routes;
