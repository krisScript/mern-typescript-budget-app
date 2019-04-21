const validationErrorsIsEmpty = (validationResult: any) => {
  console.log(validationResult, typeof validationResult);
  // const errors = validationResult;
  // if (!errors.isEmpty()) {
  //   const error = new Error();
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }
};
export default validationErrorsIsEmpty;
