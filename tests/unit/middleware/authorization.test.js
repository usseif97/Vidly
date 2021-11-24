import mongoose from 'mongoose'; // mongoose is a function
import { describe, it } from "jest-circus";
import { Genre } from '../../../models/genre.js'
import { User } from '../../../models/user.js'
import authorization from '../../../middleware/authorization.js'

let server;

describe('authorization middleware', () => {
    beforeEach(() => { server = require('../../index'); });
    afterEach(async () => { 
        server.close();
        await Genre.remove({});
    });

    it('should populate req.user with the payload of a valid token', async () => {
        const user = { 
            _id: mongoose.Types.ObjectId().toHexString(),
            isAdmin: true,
        };
        const token = new User(user).generateAuthToken();

        const req = {
            header: jest.fn().mockReturnValue(token),
        }
        const res = {};
        const next = jest.fn();

        auth(req, res, next)
        
        expect(req.user).toMatchObject(user);
    });
});