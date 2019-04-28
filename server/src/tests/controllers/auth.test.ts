import request from 'supertest';
import app from '../../app';

import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createUser from '../../services/createUser';

import sendEmailConfirmation from '../../services/sendEmailConfirmation';

import { Response, Request, NextFunction } from 'express';

let mongoServer: any;

// jest.mock('../../services/createUser');
jest.mock('../../services/sendEmailConfirmation');
describe('/auth', (): void => {
  let mongoServer: any;
  const opts = {}; // remove this option if you use mongoose 5 and above

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, opts, err => {
      if (err) console.error(err);
    });
  });

  afterAll(async () => {
    mongoose.disconnect();
    await mongoServer.stop();
  });

  describe('auth', (): void => {
    describe('/sign-up', (): void => {
      it('signing up new user', async (): Promise<void> => {
        const response = await request(app)
          .post('/auth/sign-up')
          .send({
            email: 'test@mail.com',
            username: 'testUserName',
            password: '123456789123',
            matchPassword: '123456789123',
          });
        expect(response.status).toEqual(200);
        expect(sendEmailConfirmation).toHaveBeenCalledTimes(1);
        expect(response.body).toEqual({ message: 'User created!' });
      }, 100000);
    });
  });
});
