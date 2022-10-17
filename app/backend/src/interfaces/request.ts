import { Request } from 'express';
import IToken from './tokenContent';

interface IRequestWithUser extends Request {
  user?: IToken;
}

export default IRequestWithUser;
