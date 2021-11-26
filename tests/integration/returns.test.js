import request from 'supertest'; // request is a function
import mongoose from 'mongoose'; // mongoose is a function
import moment from 'moment'; // moment is a function
import { Rental } from '../../models/rental.js'
import { User } from '../../models/user.js'
import { Movie } from '../../models/movie.js';

describe('/api/returns', () => {
    let server;
    let rental;
    let movie;
    let customerId;
    let movieId;

    beforeEach(async () => { 
        server = require('../../index');
        customerId = mongoose.Types.ObjectId();
        movieId = mongoose.Types.ObjectId();

        movie = new Movie({
            _id: movieId,
            title: '12345',
            genre: { name: '12345' },
            dailyRentalRate: 2,
            numberInStock: 10,
        });
        await movie.save();

        rental = new Rental({
            customer: {
                _id: customerId,
                name: '12345',
                phone: '123456789',
            },
            movie: {
                _id: movieId,
                title: '12345',
                dailyRentalRate: 2,
            },
        });
        await rental.save();
    });
    afterEach(async () => { 
        await server.close();
        await Rental.remove({});
        await Movie.remove({});
     });

     it('should return 401 if client not logged in', async () => {
        const response = await request(server)
            .post('/api/returns')
            .send({ customerId: customerId, movieId: movieId });
        expect(response.status).toBe(401);
     });

     it('should return 400 if cutomerId is not provided', async () => {
         const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ movieId: movieId });
        expect(response.status).toBe(400);
     });

     it('should return 400 if movieId is not provided', async () => {
        const token = new User().generateAuthToken();

       const response = await request(server)
           .post('/api/returns')
           .set('x-auth-token', token)
           .send({ customerId: customerId });
       expect(response.status).toBe(400);
    });

    it('should return 404 if no rental found', async () => {
        await Rental.remove({});
        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });
       expect(response.status).toBe(404);
    });

    it('should return 400 if rental is arleady processed - return date is set', async () => {
        rental.dateReturned = new Date();
        await rental.save();
        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });
       expect(response.status).toBe(400);
    });

    it('should return 200 if we have valid request', async () => {
        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });
       expect(response.status).toBe(200);
    });

    it('should set the return date if we have valid request', async () => {
        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });

        const rentalInDB = await Rental.findById(rental._id);
        const difference = new Date() - rentalInDB.dateReturned; // milliSeconds
        expect(difference).toBeLessThan(10 * 1000); // 10 seconds
    });

    it('should set the rental fee if we have valid request', async () => {
        rental.dateOut = moment().add(-7, 'days').toDate(); // 7days ago 
        await rental.save();

        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });

        const rentalInDB = await Rental.findById(rental._id);
        expect(rentalInDB.rentalFee).toBe(7 * 2);
    });

    it('should increase the movie stock if we have valid request', async () => {
        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });

        const movieInDB = await Movie.findById(movieId);
        expect(movieInDB.numberInStock).toBe(10 + 1);
    });

    it('should return the rental if we have valid request', async () => {
        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/returns')
            .set('x-auth-token', token)
            .send({ customerId: customerId, movieId: movieId });

        expect(Object.keys(response.body))
            .toEqual(expect.arrayContaining(['customer', 'movie', 'dateOut', 'dateReturned', 'rentalFee']));
    });
});