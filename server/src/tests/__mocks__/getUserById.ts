interface GetUserByIdResponse {
  email: string;
}

const getUserByid = (userId: string): Promise<GetUserByIdResponse> => {
  console.log('getuserById Mock');
  return Promise.resolve({ email: 'testMail.com' });
};
export default getUserByid;
