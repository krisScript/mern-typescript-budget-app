import CustomError from '../classes/CustomError';
const isAuthorized = async (
  userId: string,
  itemUserId: string,
): Promise<void> => {
  try {
    if (userId !== itemUserId) {
      const error = new CustomError('unauthorized!', 401);
      throw error;
    }
  } catch (err) {
    throw err;
  }
};
export default isAuthorized;
