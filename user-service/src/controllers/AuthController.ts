import { Request, Response, NextFunction } from 'express';
import config, { isProdEnv } from '../config/config';
import { IUser, User } from '../database';
import { ApiError, encryptPassword, isPasswordMatch } from '../utils';
import * as jwt from 'jsonwebtoken';

const jwtSecret = config.JWT_SECRET as string;
const COOKIE_EXPRIRATION_DAYS = 90;
const exprirationDate = new Date(Date.now() + COOKIE_EXPRIRATION_DAYS * 24 * 60 * 60);
const cookieOptions = {
  expried: exprirationDate,
  secure: false,
  httpOnly: true,
};

const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, password, email } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new ApiError(400, 'User already Exist');
    }

    const user = await User.create({
      name,
      email,
      password: await encryptPassword(password),
    });

    const userData = { id: user._id, name, email };

    res.status(200).json({
      code: 200,
      message: 'User created successfully!',
      data: userData,
    });
  } catch (error: any) {
    res.json({
      status: error.statusCode || 500,
      message: error.message,
    });
  }
};

const createSendToken = async (user: IUser, res: Response) => {
  const { name, email, id } = user;
  const token = jwt.sign({ name, email, id }, jwtSecret, { expiresIn: '30d' });
  if (isProdEnv) cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);

  return token;
};

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await isPasswordMatch(password, user.password))) {
      throw new ApiError(400, 'Invalid email or password');
    }
    const token = await createSendToken(user!, res);

    res.status(200).json({
      status: 200,
      message: 'User logged in successfully!',
      token,
    });
  } catch (error: any) {
    res.json({
      status: error.statusCode || 500,
      message: error.message,
    });
  }
};

export default { register, login };
