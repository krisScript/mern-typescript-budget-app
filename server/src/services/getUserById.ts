import User from '../models/User';
import ValidationError from '../classes/ValidationError';
import CustomError from '../classes/CustomError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
import UserType from '../interfaces/User';
const getUserById = async (userId: string): Promise<UserType> => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      const error = new CustomError('User not found!', 404);
      throw error;
    }
    return user;
  } catch (err) {
    const validationErrorObj: ValidationErrorType = {
      location: 'body',
      param: 'email',
      msg: 'User with this email does not exist!',
      value: '',
    };
    const validationError = new ValidationError('Validation Error', 403, [
      validationErrorObj,
    ]);
    throw validationError;
  }
};
export default getUserById;
