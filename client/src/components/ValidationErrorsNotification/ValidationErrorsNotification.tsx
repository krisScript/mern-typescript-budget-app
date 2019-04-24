import React, { FunctionComponent } from 'react';
interface ValidationErrorsNotificationProps {
  validationErrorMessages: string[];
}
const ValidationErrorsNotification: FunctionComponent<
  ValidationErrorsNotificationProps
> = ({ validationErrorMessages }): JSX.Element => {
  return (
    <div className="notification is-danger">
      {validationErrorMessages.map(
        (errorMessage: string): JSX.Element => (
          <p key={errorMessage}>{errorMessage}</p>
        ),
      )}
    </div>
  );
};
export default ValidationErrorsNotification;
