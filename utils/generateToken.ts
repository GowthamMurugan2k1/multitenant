import jwt from "jsonwebtoken";

const ACCESS_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET;

interface User {
  id: string;
}
export const generateAccessToken = (user: User) => {
  return jwt.sign(user, ACCESS_SECRET!, {
    expiresIn: "1d",
  });
};

export const generateRefreshToken = (user: User) => {
  return jwt.sign(user, REFRESH_SECRET!, {
    expiresIn: "2d",
  });
};
