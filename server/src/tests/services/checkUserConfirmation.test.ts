import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import checkUserConfirmation from '../../services/checkUserConfirmation';
import User from '../../models/User';
let mongoServer: any;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
describe('getUserByEmail', (): void => {
  let mongoServer: any;
  const opts = {}; // remove this option if you use mongoose 5 and above
  const email = 'test@mail.com';
  const password = 'testPassword';
  const username = 'testUsername';
  let userId: string;
  beforeAll(async () => {
    mongoServer = new MongoMemoryServer();
    const mongoUri = await mongoServer.getConnectionString();
    await mongoose.connect(mongoUri, opts, err => {});
    const newUser = new User({
      email,
      password,
      username,
    });
    await newUser.save();
    userId = newUser._id.toString();
  });

  afterAll(async () => {
    // await mongoServer.stop();
    // await mongoose.disconnect();
  });

  it(`should throw Validation error if user's email isn't confirmed`, async (): Promise<
    void
  > => {
    const user = await User.findById(userId);
    if (!user) {
      throw '';
    }
    await expect(checkUserConfirmation(user)).rejects.toThrow(
      new Error('Validation Error'),
    );
  });
  it(`shouldn't throw Validation error if user's email is confirmed`, async (): Promise<
    void
  > => {
    const user = await User.findById(userId);
    if (!user) {
      throw '';
    }
    await user.confirm();
    await expect(checkUserConfirmation(user)).toEqual(Promise.resolve({}));
  });
});
