import { Request, Response } from "express";
import { decryptData } from "../utils/decryptData";
import { prismaClient } from "../lib/prismaClient.js";
import { CatchAsyncHandler } from "../middlewares/error-middleware";
import { AuthRequest } from "../types/common";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/generateToken";
import { ErrorResponse } from "../common/ErrorResponse";
import { VerifyRefreshToken } from "../utils/verifyToken";

const JWT_SECRET = process.env.JWT_SECRET;

export const handleGetUser = CatchAsyncHandler(
  async (req: Request, res: Response) => {
    const user = await prismaClient.user.findMany({
      include: { space: true, Task_Assignees: true },
    });
    res.status(200).json({ status: true, message: user });
  }
);

export const handleGoogleSignIn = async (req: Request, res: Response) => {};

export const handleCreateUser = CatchAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        res.status(400).json({ error: "Data is required" });
        return;
      }
      const decryptPass = decryptData(password);
      if (!decryptPass) {
        res.status(400).json({ error: "Decryption failed" });
        return;
      }
      // Check is email is Exist
      const isEmailExist = await prismaClient.user.findUnique({
        where: { emailId: email },
      });
      if (isEmailExist) {
        res.status(400).json({ error: "User already exists." });
        return;
      }
      const addNewUser = await prismaClient.user.create({
        data: { emailId: email, name, password: decryptPass },
        select: {
          emailId: true,
          name: true,
          profilePic: true,
          id: true,
          password: true,
          tenantId: true,
        },
      });

      if (!JWT_SECRET) {
        throw new Error(`JWT Seceret is ${JWT_SECRET}`);
      }

      let userId = addNewUser?.id;

      const access_token = generateAccessToken({ id: userId });
      const refreshToken = generateRefreshToken({ id: userId });

      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshToken: refreshToken,
        },
      });

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      });

      res.setHeader("Authorization", `Bearer ${access_token}`);

      const { emailId, id, name: userName, profilePic,tenantId } = addNewUser;
      let UserInfo = {
        emailId,
        id,
        name: userName,
        profilePic,
        tenantId:tenantId
      };

      res.status(201).json({ status: true, UserInfo, access_token });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Login user => Email login
export const handleEmailLogin = CatchAsyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res
          .status(400)
          .send({ status: false, error: "Email and Password is required" });
        return;
      }

      // decrypt the password
      const decryptedPass = decryptData(password);

      const fetchUser = await prismaClient.user.findUnique({
        where: {
          emailId: email.toLowerCase(),
        },
        select: {
          emailId: true,
          name: true,
          profilePic: true,
          id: true,
          password: true,
          tenantId: true,
        },
      });

      if (!fetchUser) {
        res.status(400).json({ status: false, error: "User not found." });
        return;
      }

      if (decryptedPass != fetchUser?.password) {
        res
          .status(400)
          .json({ status: false, error: "Password is incorrect." });
        return;
      }
      if (!JWT_SECRET) {
        throw new Error(`JWT Seceret is ${JWT_SECRET}`);
      }
      let userId = fetchUser.id;

      const access_token = generateAccessToken({ id: userId });
      const refresh_token = generateRefreshToken({ id: userId });

      await prismaClient.user.update({
        where: {
          id: userId,
        },
        data: {
          refreshToken: refresh_token,
        },
      });

      res.cookie("refreshToken", refresh_token, {
        sameSite: "lax",
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.setHeader("Authorization", `Bearer ${access_token}`);

      const { emailId, id, name, profilePic,tenantId } = fetchUser;
      let UserInfo = {
        emailId,
        id,
        name,
        profilePic,
        tenantId
      };

      res.status(200).json({ status: true, UserInfo, access_token });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Get user Space
export const handleGetUserSpace = CatchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).send({ status: false, message: "userId is required" });
      return;
    }
    const userSpace = await prismaClient.space.findFirst({
      where: {
        userId,
      },
      include: { list: true },
    });

    res.status(200).send({ status: true, message: userSpace });
  }
);

// ReValidate user through refreshToken and generate a accessToken
export const handleRevalidate = CatchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      res
        .status(400)
        .send({ status: false, message: "refreshToken is required" });
      return;
    }
    console.log(refreshToken, "refresh--------------toke");
    const decoded = VerifyRefreshToken(refreshToken);

    if (decoded === "failed") {
      throw new ErrorResponse("verification is failed", 400, false);
    }

    const { id } = decoded;
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
      select: {
        refreshToken: true,
      },
    });
    if (user?.refreshToken !== refreshToken) {
      throw new ErrorResponse("Invalid refresh token", 400, false);
    }

    const newAccessToken = generateAccessToken(id);
    const newRefreshToken = generateRefreshToken(id);
    await prismaClient.user.update({
      where: {
        id,
      },
      data: {
        refreshToken: newRefreshToken,
      },
    });

    res.cookie("refreshToken", newRefreshToken, {
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      httpOnly: true,
    });

    res.status(200).send({ status: true, message: newAccessToken });
  }
);
