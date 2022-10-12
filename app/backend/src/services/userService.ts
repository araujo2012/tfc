import userModel from '../database/models/User';
import decodeToken from '../helpers/authorization';

class userService {
  constructor(private model: typeof userModel) {}

  async login(email: string) {
    const user = await this.model.findOne({ where: { email } });
    return { token: user };
  }

  async getRole(token: string) {
    const user = decodeToken(token);
    const checkUser = await this.model.findOne({ where: { email: user.email } });
    return { role: user.role, validToken: (user === checkUser) };
  }
}

export default userService;
