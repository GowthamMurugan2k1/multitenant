import { Response } from "express";
import { CatchAsyncHandler } from "../middlewares/error-middleware";
import { AuthRequest } from "../types/common";
import { prismaClient } from "../lib/prismaClient";
import { RandomColorPicker } from "../lib/ColorPicker";

export const handleCreateList = CatchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { spaceId, listName } = req.body;

    if (!spaceId || !listName) {
      res
        .status(400)
        .send({ status: false, message: "SpaceId and is required" });
      return;
    }

    const userId = req.user;

    const updatedList = await prismaClient.list.create({
      data: {
        userId: userId!,
        listName,
        spaceId: spaceId,
        color: RandomColorPicker().hex,
      },
    });

    res.status(201).send({ status: true, message: updatedList });
  }
);
