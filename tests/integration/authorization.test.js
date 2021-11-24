import request from 'supertest'; // request is a function
import { describe, it } from "jest-circus";
import { Genre } from '../../models/genre.js'
import { User } from '../../models/user.js'

let server;

describe('authorization middleware', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close();
        await Genre.remove({});
    });

    it('should return 401 if no token is provided', async () => {
        const response = await request(server)
            .post('/api/genres')
            .send({ name: 'Genre1' });
        expect(response.status).toBe(401);
    });

    it('should return 400 if token is inValid', async () => {
        const token = 'a';

        const response = await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'Genre1' });
        expect(response.status).toBe(400);
    });

    it('should return 200 if token is Valid', async () => {
        const token = new User().generateAuthToken();

        const response = await request(server)
            .post('/api/genres')
            .set('x-auth-token', token)
            .send({ name: 'Genre1' });
        expect(response.status).toBe(200);
    });
});