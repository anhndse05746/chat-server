import { Request, RequestHandler, Response } from "express";
import config from "../config/config";
import { User } from "../database";
import { ApiError, encryptPassword } from "../utils";

const jwtSecret = config.JWT_SECRET as string;
const COOKIE_EXPRIRATION_DAYS = 90;
const exprirationDate = new Date(
  Date.now() + COOKIE_EXPRIRATION_DAYS * 24 * 60 * 60
);
const cookieOptions = {
  expried: exprirationDate,
  secure: false,
  httpOnly: true,
};

const register = async (req: Request, res: Response) => {
  try {
    const { name, password, email } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new ApiError(400, "User already Exist");
    }

    const user = await User.create({
      name,
      email,
      password: await encryptPassword(password),
    });

    const userData = { id: user._id, name, email };

    res.status(200).json({
      code: 200,
      message: "User created successfully!",
      data: userData,
    });
  } catch (error: any) {
    res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
};

const login = async (req: Request, res: Response) => {
  res.status(200).json({ message: "login" });
};

export default { register, login };
