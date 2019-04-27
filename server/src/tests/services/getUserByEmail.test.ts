import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import getUserByEmail from '../../services/getUserByEmail';
import User from '../../models/User';
let mongoServer: any;
describe('getUserByEmail', (): void => {
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

  it('fetching user', async (): Promise<void> => {
    const email = 'test@mail.com';
    const password = 'testPassword';
    const username = 'testUsername';
    const newUser = new User({
      email,
      password,
      username,
    });
    await newUser.save();
    const user = await getUserByEmail(email);
    expect(user).toBeTruthy();
    expect(user.email).toMatch(email);
    expect(user.password).toMatch(password);
    expect(user.username).toMatch(username);
  }, 100000);
});
