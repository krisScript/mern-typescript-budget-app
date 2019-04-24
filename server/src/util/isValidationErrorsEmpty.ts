import ValidationError from '../classes/ValidationError';
import ValidationErrorType from '../interfaces/ValidationErrorType';
const validationErrorsIsEmpty = (validationResult: any): never | void => {
  const errors = validationResult;
  if (!errors.isEmpty()) {
    const validationErrors: ValidationErrorType[] = errors.array();
    const status = 422;
    const error = new ValidationError(validationErrors, status);
    throw error;
  }
};
export default validationErrorsIsEmpty;
