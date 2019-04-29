import User from '../models/User';
import ValidationError from '../classes/ValidationError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
import UserType from '../interfaces/User';
const getUserByEmail = async (email: string): Promise<UserType> => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      const validationErrorObj: ValidationErrorType = {
        location: 'body',
        param: 'email',
        msg: 'User with this email does not exist!',
        value: email,
      };
      const validationError = new ValidationError('Validation Error', 403, [
        validationErrorObj,
      ]);
      throw validationError;
    }
    return user;
  } catch (err) {
    throw err;
  }
};
export default getUserByEmail;
