import React, { useState } from 'react';
import ValidationError from '../../interfaces/ValidationError';
interface UseValidationErrorsReturnValue {
  validationErrorMessages: string[];
  validationErrorParams: string[];
  toggleValidationErrors: (validationErrors: ValidationError[]) => void;
}
const useValidationErrors = (): UseValidationErrorsReturnValue => {
  const [validationErrorMessages, setValidationErrorMessages] = useState<
    string[]
  >([]);
  const [validationErrorParams, setValidationErrorParams] = useState<string[]>(
    [],
  );
  const toggleValidationErrors = (
    validationErrors: ValidationError[],
  ): void => {
    setValidationErrorMessages(
      validationErrors.map(validationError => validationError.msg),
    );
    setValidationErrorParams(
      validationErrors.map(validationError => validationError.param),
    );
  };
  return {
    validationErrorMessages,
    validationErrorParams,
    toggleValidationErrors,
  };
};
export default useValidationErrors;
