import request from 'supertest'; // request is a function
import mongoose from 'mongoose'; // mongoose is a function
import { afterEach, beforeEach, describe, it } from "jest-circus";
import { Genre } from '../../models/genre.js'
import { User } from '../../models/user.js'

let server;

describe('/api/genres', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close();
        await Genre.remove({});
     });

    describe('GET /', () => {
        it('should return all genres', async () => {
            await Genre.collection.insertMany([
                { name: "Genre1" },
                { name: "Genre2" },
            ]);
            const response = await request(server).get('/api/genres');
            expect(response.status).toBe(200);
            expect(response.body.length).toBe(2);
            expect(response.body.some(g => g.name === 'Genre1')).toBeTruthy();
            expect(response.body.some(g => g.name === 'Genre2')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('should return a genre if it have the valid id', async () => {
            const genre = new Genre({ name: 'Genre1' });
            await genre.save();
            const response = await request(server).get('/api/genres/' + genre._id);
            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('name', genre.name);
        });

        it('should return 404 if it have inValid id', async () => {
            const response = await request(server).get('/api/genres/' + 1);
            expect(response.status).toBe(404);
        });

        it('should return 404 if no genre with the given id', async () => {
            const response = await request(server).get('/api/genres/' + mongoose.Types.ObjectId());
            expect(response.status).toBe(404);
        });
    });

    describe('POST /', () => {
        it('should return 401 if the client is not logged in', async () => {
            const response = await request(server)
                .post('/api/genres')
                .send({ name: 'Genre1' });
            expect(response.status).toBe(401);
        });

        it('should return 400 if the genre is inValid - less than 5 characters', async () => {
            const token = new User().generateAuthToken();

            const response = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: '1234' });

            expect(response.status).toBe(400);
        });

        it('should return 400 if the genre is inValid - more than 50 characters', async () => {
            const token = new User().generateAuthToken();
            const name = new Array(52).join('a');

            const response = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: name });

            expect(response.status).toBe(400);
        });

        it('should save the genre if is valid', async () => {
            const token = new User().generateAuthToken();

            const response = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'Genre1' });

            const genre = await Genre.find({ name: 'Genre1' });
            expect(genre).not.toBeNull();
            expect(response.status).toBe(200);
        });

        it('should return the genre if is valid', async () => {
            const token = new User().generateAuthToken();

            const response = await request(server)
                .post('/api/genres')
                .set('x-auth-token', token)
                .send({ name: 'Genre1' });

            expect(response.body).toHaveProperty('_id');
            expect(response.body).toHaveProperty('name', 'Genre1');
            expect(response.status).toBe(200);
        });
    });

    describe('PUT /:id', () => {
        let token; 
        let newName; 
        let genre; 
        let id; 
    
        const exec = async () => {
          return await request(server)
            .put('/api/genres/' + id)
            .set('x-auth-token', token)
            .send({ name: newName });
        }
    
        beforeEach(async () => {
          // Before each test we need to create a genre and 
          // put it in the database.      
          genre = new Genre({ name: 'genre1' });
          await genre.save();
          
          token = new User().generateAuthToken();     
          id = genre._id; 
          newName = 'updatedName'; 
        })
    
        it('should return 401 if client is not logged in', async () => {
          token = ''; 
    
          const res = await exec();
    
          expect(res.status).toBe(401);
        });
    
        it('should return 400 if genre is less than 5 characters', async () => {
          newName = '1234'; 
          
          const res = await exec();
    
          expect(res.status).toBe(400);
        });
    
        it('should return 400 if genre is more than 50 characters', async () => {
          newName = new Array(52).join('a');
    
          const res = await exec();
    
          expect(res.status).toBe(400);
        });
    
        it('should return 404 if id is invalid', async () => {
          id = 1;
    
          const res = await exec();
    
          expect(res.status).toBe(404);
        });
    
        it('should return 404 if genre with the given id was not found', async () => {
          id = mongoose.Types.ObjectId();
    
          const res = await exec();
    
          expect(res.status).toBe(404);
        });
    
        it('should update the genre if input is valid', async () => {
          await exec();
    
          const updatedGenre = await Genre.findById(genre._id);
    
          expect(updatedGenre.name).toBe(newName);
        });
    
        it('should return the updated genre if it is valid', async () => {
          const res = await exec();
    
          expect(res.body).toHaveProperty('_id');
          expect(res.body).toHaveProperty('name', newName);
        });
      });  
    
      describe('DELETE /:id', () => {
        let token; 
        let genre; 
        let id; 
    
        const exec = async () => {
          return await request(server)
            .delete('/api/genres/' + id)
            .set('x-auth-token', token)
            .send();
        }
    
        beforeEach(async () => {
          // Before each test we need to create a genre and 
          // put it in the database.      
          genre = new Genre({ name: 'genre1' });
          await genre.save();
          
          id = genre._id; 
          token = new User({ isAdmin: true }).generateAuthToken();     
        })
    
        it('should return 401 if client is not logged in', async () => {
          token = ''; 
    
          const res = await exec();
    
          expect(res.status).toBe(401);
        });
    
        it('should return 403 if the user is not an admin', async () => {
          token = new User({ isAdmin: false }).generateAuthToken(); 
    
          const res = await exec();
    
          expect(res.status).toBe(403);
        });
    
        it('should return 404 if id is invalid', async () => {
          id = 1; 
          
          const res = await exec();
    
          expect(res.status).toBe(404);
        });
    
        it('should return 404 if no genre with the given id was found', async () => {
          id = mongoose.Types.ObjectId();
    
          const res = await exec();
    
          expect(res.status).toBe(404);
        });
    
        it('should delete the genre if input is valid', async () => {
          await exec();
    
          const genreInDb = await Genre.findById(id);
    
          expect(genreInDb).toBeNull();
        });
    
        it('should return the removed genre', async () => {
          const res = await exec();
    
          expect(res.body).toHaveProperty('_id', genre._id.toHexString());
          expect(res.body).toHaveProperty('name', genre.name);
        });
      });  
});