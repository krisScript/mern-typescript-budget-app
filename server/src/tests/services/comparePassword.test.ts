import comparePassword from '../../services/comparePassword';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
describe('comparePassword', (): void => {
  let password: string;
  let hashedPassword: string;
  beforeEach(async () => {
    password = '12345678';
    hashedPassword = await bcrypt.hash(password, 12);
  });
  it(`should throw Validation error if the password is wrong `, async () => {
    const wrongPassword = 'wrong';
    await expect(
      comparePassword(wrongPassword, hashedPassword),
    ).rejects.toThrow(new Error('Validation Error'));
  });
  it(`shouldn't throw Validation error if the password is correct`, async (): Promise<
    void
  > => {
    await expect(comparePassword(password, hashedPassword)).toEqual(
      Promise.resolve({}),
    );
  });
});
