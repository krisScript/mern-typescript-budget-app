import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createUser from '../../services/createUser';
import { create } from 'domain';
let mongoServer: any;
describe('createUser', (): void => {
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

  it('creating user', async (): Promise<void> => {
    const email = 'test@mail.com';
    const username = 'testUser';
    const password = 'testPassword';
    const { userId } = await createUser(email, username, password);
    expect(userId).toBeTruthy();
    expect(typeof userId).toMatch('string');
  }, 100000);
});
