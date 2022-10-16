import * as jwt from 'jsonwebtoken';
import IToken from '../interfaces/tokenContent';

const createToken = (content: IToken) => {
  const { id, username, role, email, password } = content;
  const token = jwt
    .sign({ id, username, role, email, password }, process.env.JWT_SECRET || 'jwt_secret');
  return token;
};

const decodeToken = (token: string) => {
  const user = jwt.verify(token, process.env.JWT_SECRET as string);
  return user;
};

export {
  createToken,
  decodeToken,
};
