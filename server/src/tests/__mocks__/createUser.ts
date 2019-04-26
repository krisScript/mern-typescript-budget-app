interface CreateUserResponse {
  userId: string;
}
const createUser = (
  email: string,
  username: string,
  password: string,
): Promise<CreateUserResponse> => {
  return Promise.resolve({ userId: 'testUserId' });
};
export default createUser;
