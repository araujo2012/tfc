import userModel from '../database/models/User';

class userService {
  constructor(private model: typeof userModel) {}

  async login(email: string) {
    const user = await this.model.findOne(
      { where: { email } },
    );
    return { token: user };
  }
}

export default userService;
