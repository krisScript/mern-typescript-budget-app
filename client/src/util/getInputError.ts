const getInputError = (validationErrorParams: string[], name: string) => {
  return validationErrorParams.includes(name);
};

export default getInputError;
