import ValidationError from '../classes/ValidationError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
import User from '../interfaces/User';
const checkUserConfirmation = async (user: User): Promise<void> => {
  try {
    if (!user.confirmed) {
      const validationErrorObj: ValidationErrorType = {
        location: 'body',
        param: 'confirmed',
        msg: 'Please confirm your email!',
        value: '',
      };
      const validationError = new ValidationError('Validation Error', 403, [
        validationErrorObj,
      ]);
      throw validationError;
    }
  } catch (err) {
    throw err;
  }
};
export default checkUserConfirmation;
