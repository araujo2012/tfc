import { compareSync } from 'bcryptjs';
import createToken from '../helpers/token';
import userModel from '../database/models/User';
import decodeToken from '../helpers/authorization';

class userService {
  constructor(private model: typeof userModel) {}

  async login(email: string, password: string) {
    const user = await this.model.findOne({ where: { email } });
    if (!user) return undefined;
    const validPassword = await compareSync(password, user.password);
    if (!validPassword) return undefined;
    const token = createToken(user);
    return { token };
  }

  async getRole(token: string) {
    const user = decodeToken(token);
    const checkUser = await this.model.findOne({ where: { email: user.email } });
    return { role: user.role, validToken: (user === checkUser) };
  }
}

export default userService;
