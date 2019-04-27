import ValidationErrorType from '../interfaces/ValidationErrorType';
import bcrypt, { compare } from 'bcryptjs';
import ValidationError from '../classes/ValidationError';
const comparePassword = async (
  password: string,
  userPassword: string,
): Promise<void> => {
  try {
    const passwordMatch = await bcrypt.compare(password, userPassword);
    if (!passwordMatch) {
      const validationErrorObj: ValidationErrorType = {
        location: 'body',
        param: 'password',
        msg: 'Password does not match!',
        value: password,
      };
      const validationError = new ValidationError('Validation Error', 403, [
        validationErrorObj,
      ]);
      throw validationError;
    }
  } catch (err) {
    throw new Error(err);
  }
};
export default comparePassword;
