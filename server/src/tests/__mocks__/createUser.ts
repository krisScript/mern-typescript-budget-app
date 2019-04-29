interface CreateUserResponse {
  userId: string;
}
const createUser = () =>
  new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve({ userId: 'testUserId' });
    }, 300);
  });
export default createUser;
// const createUser = (
//   email: string,
//   username: stridng,
//   password: string,
// ): Promise<CreateUserResponse> => {
//   return Promise.resolve({ userId: 'testUserId' });
// };
// export default createUser;
