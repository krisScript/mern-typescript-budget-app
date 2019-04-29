import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import createUser from '../../services/createUser';
import { create } from 'domain';
let mongoServer: any;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
describe('createUser', (): void => {
  let mongoServer: any;
  const opts = {}; // remove this option if you use mongoose 5 and above

  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, opts, err => {});
  });

  afterAll(async () => {
    await mongoServer.stop();
    await mongoose.disconnect();
  });

  it('creating user', async (): Promise<void> => {
    const email = 'test@mail.com';
    const username = 'testUser';
    const password = 'testPassword';
    const { userId } = await createUser(email, username, password);
    expect(userId).toBeTruthy();
    expect(typeof userId).toMatch('string');
  });
});
