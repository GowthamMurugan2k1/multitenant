import jwt, { JwtPayload } from "jsonwebtoken";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;

export function VerifyRefreshToken(refreshToken: string) {
  try {
    const decoded = jwt.verify(
      refreshToken,
      REFRESH_TOKEN_SECRET!
    ) as JwtPayload;

    return decoded;
  } catch (error) {
    return "failed";
  }
}

export function VerifyAccessToken(accessToken: string) {
  try {
    const decoded = jwt.verify(accessToken, JWT_SECRET!) as JwtPayload;

    return decoded;
  } catch (error) {
    return "failed";
  }
}
