import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import getUserByEmail from '../../services/getUserByEmail';
import User from '../../models/User';
let mongoServer: any;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
describe('getUserByEmail', (): void => {
  let mongoServer: any;
  const opts = {}; // remove this option if you use mongoose 5 and above
  const email = 'test@mail.com';
  const password = 'testPassword';
  const username = 'testUsername';

  beforeAll(
    async (): Promise<void> => {
      mongoServer = new MongoMemoryServer();
      const mongoUri = await mongoServer.getConnectionString();
      await mongoose.connect(mongoUri, opts, err => {});
      const user = new User({
        email,
        password,
        username,
      });
      await user.save();
    },
  );

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
  });

  it('fetching registered user', async (): Promise<void> => {
    const user = await getUserByEmail(email);
    expect(user).toBeTruthy();
    expect(user.email).toMatch(email);
    expect(user.password).toMatch(password);
    expect(user.username).toMatch(username);
  });
  it('fetching non registered user', async (): Promise<void> => {
    const nonRegisteredEmail = 'nonRegisteredEmail.com';
    await expect(getUserByEmail(nonRegisteredEmail)).rejects.toThrow(
      new Error('Validation Error'),
    );
  });
});
