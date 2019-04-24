import ValidationErrorType from '../interfaces/ValidationErrorType';
export class ValidationError extends Error {
  public data: ValidationErrorType[];
  public status: number;

  public constructor(errors: ValidationErrorType[], status: number) {
    super();
    this.data = errors;
    this.status = status;
  }
}
export default ValidationError;
