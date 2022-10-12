import { Request, Response, NextFunction } from 'express';

const checkEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const emailRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  if (!emailRegex.test(email)) {
    return res.status(401).json({ message: 'Incorrect email or password' });
  }
  next();
};

const checkPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  if (password.length <= 6) return res.status(401).json({ message: 'Incorrect email or password' });
  next();
};

export {
  checkEmail,
  checkPassword,
};
