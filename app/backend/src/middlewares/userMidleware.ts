import { Request, Response, NextFunction } from 'express';

const checkEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'missing email' });
  next();
};

const checkPassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'missing password' });
  next();
};

export {
  checkEmail,
  checkPassword,
};
