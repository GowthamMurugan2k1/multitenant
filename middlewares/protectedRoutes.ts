import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/common";
import { VerifyAccessToken } from "../utils/verifyToken";


// Middleware to verify JWT token
export const protectedRoutes = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];
  
  if (!token) {
    res.status(401).send("Authentication required.");
    return;
  }

  try {
    const decoded = VerifyAccessToken(token)
    if(decoded ==="failed"){
      res.status(401).send("Authentication failed.");
      return;
    }
    
    req.user =  decoded.id
    next();
  } catch (error) {
    res.status(401).json({ status: false, error: "Invalid token" }); 
  }
};
