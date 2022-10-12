const decodeToken = (token: string) => {
  const email = token;
  const role = token;
  const password = token;
  const username = token;
  return {
    email,
    role,
    password,
    username,
  };
};

export default decodeToken;
