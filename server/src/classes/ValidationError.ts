import ValidationErrorType from '../interfaces/ValidationErrorType';
import CustomError from './CustomError';
class ValidationError extends CustomError {
  public data: ValidationErrorType[];
  public constructor(
    message: string,
    status: number,
    errors: ValidationErrorType[],
  ) {
    super(message, status);
    this.data = errors;
  }
}
export default ValidationError;
