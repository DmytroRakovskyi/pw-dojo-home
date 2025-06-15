const dataGenerator = () => {
  const timestamp = Date.now();
  const randomNumber = Math.floor(Math.random() * 1000);
  const uniqueUser = `user${randomNumber}${timestamp}`;
  const userEmail = `${uniqueUser}@test.com`;
  const userPassword = '12345';

  return { uniqueUser, userEmail, userPassword };
};

const invalidData = {
  invalidUser: 'user_',
  invalidEmail: '1234@i',
  invalidPassword: '1',
};

export { dataGenerator, invalidData };
