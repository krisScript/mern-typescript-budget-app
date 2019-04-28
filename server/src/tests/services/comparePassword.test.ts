import comparePassword from '../../services/comparePassword';
import User from '../../models/User';
import bcrypt from 'bcryptjs';
describe('comparePassword', (): void => {
  let password: string;
  let hashedPassword: string;
  beforeEach(async () => {
    password = '12345678';
    hashedPassword = await bcrypt.hash(password, 12);
  });
  it(`should throw `, async () => {
    const wrongPassword = 'wrong';
    await expect(
      comparePassword(wrongPassword, hashedPassword),
    ).rejects.toThrow(new Error('Error: Validation Error'));
  });
});
