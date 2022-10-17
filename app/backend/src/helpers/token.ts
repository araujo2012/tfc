import * as jwt from 'jsonwebtoken';
import IRequestWithUser from '../interfaces/request';
import IToken from '../interfaces/tokenContent';

const createToken = (content: IToken) => {
  const { username, role, email } = content;
  const token = jwt
    .sign({ username, role, email }, process.env.JWT_SECRET || 'jwt_secret');
  return token;
};

const decodeToken = (req: IRequestWithUser, token: string) => {
  const user = jwt.verify(token, process.env.JWT_SECRET as string) as IToken;
  req.user = user;
};

export {
  createToken,
  decodeToken,
};
