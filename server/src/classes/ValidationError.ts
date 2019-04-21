import ValidationErrorType from '../interfaces/ValidationErrorType';
const Errors = {
  BadRequest: {
    status: 400,
    message: 'Request has wrong format.',
  },
  Unauthorized: {
    status: 401,
    message: 'Authentication credentials not valid.',
  },
  Forbidden: {
    status: 403,
    message: "You're missing permission to execute this request.",
  },
};

export class ValidationError extends Error {
  public response: ValidationErrorType;

  public constructor(error: ValidationErrorType, ...args: any) {
    super(...args);
    this.response = error;
  }
}
export default ValidationError;
