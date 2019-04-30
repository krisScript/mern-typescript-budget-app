import request from 'supertest';
import app from '../../app';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import User from '../../models/User';
import sendEmailConfirmation from '../../services/sendEmailConfirmation';
import createUser from '../../services/createUser';
import getUserById from '../../services/getUserById';
let mongoServer: any;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
jest.mock('../../services/sendEmailConfirmation');
// jest.mock('../../services/getUserById');

describe('/auth', (): void => {
  let mongoServer: any;
  const opts = {};

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoURI = await mongoServer.getConnectionString();
    await mongoose.connect(mongoURI, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
  });

  describe('/sign-up', (): void => {
    const username = 'test2UserName';
    const email = 'testMail@mail.com';
    const password = '1234567891011';
    const incorrectPassword = 'aaaaaaaaaaaaaa';
    it('signing up new user', async (): Promise<void> => {
      const response = await request(app)
        .post('/auth/sign-up')
        .send({
          email,
          username,
          password,
          matchPassword: password,
        });
      expect(response.status).toEqual(200);
      expect(sendEmailConfirmation).toBeCalledTimes(1);
      expect(response.body).toMatchSnapshot();
    });
    it('signing up new user with used email and username', async (): Promise<
      void
    > => {
      const response = await request(app)
        .post('/auth/sign-up')
        .send({
          email,
          username,
          password,
          matchPassword: password,
        });
      expect(response.error).toMatchSnapshot();
      expect(response.status).toEqual(403);
      expect(response.body).toMatchSnapshot();
    });
    it('signing up new user non matching password', async (): Promise<void> => {
      const response = await request(app)
        .post('/auth/sign-up')
        .send({
          email,
          username,
          password,
          matchPassword: incorrectPassword,
        });
      expect(response.error).toMatchSnapshot();
      expect(response.status).toEqual(403);
      expect(response.body).toMatchSnapshot();
    });
  });
  describe('/login', (): void => {});
});
