import ValidationErrorType from '../interfaces/ValidationErrorType';
import CustomError from './CustomError';
class EmailCOnfirmationError extends CustomError {
  public data: string;
  public constructor(message: string, status: number, data: string) {
    super(message, status);
    this.data = data;
  }
}
export default EmailCOnfirmationError;
