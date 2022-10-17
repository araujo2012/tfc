import { compareSync } from 'bcryptjs';
import { createToken } from '../helpers/token';
import userModel from '../database/models/User';
import IToken from '../interfaces/tokenContent';

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

  async getRole(user: IToken) {
    const validUser = await this.model.findOne({ where: { email: user.email } });
    if (!validUser) return undefined;
    const { email, username, role } = validUser;
    if (user.email !== email) return undefined;
    if (user.username !== username) return undefined;
    if (user.role !== role) return undefined;
    return { role };
  }
}

export default userService;
