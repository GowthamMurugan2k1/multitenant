import { Request, Response } from "express";
import { prismaClient } from "../lib/prismaClient.js";
import { AuthRequest } from "../types/common.js";
import { CatchAsyncHandler } from "../middlewares/error-middleware";
import { RandomColorPicker } from "../lib/ColorPicker.js";

export const handleCreateSpace = CatchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { Space, List } = req.body;

    if (!Space || !List) {
      res.status(400).send({ status: false, error: "fields are required" });
      return;
    }

    // const  parsedList = JSON.parse(List);
    // console.log(req.body,'bodyyyy',parsedList)

    const userId = req?.user;
    if (!userId) {
      res.status(400).send({ status: false, error: "userId is required" });
      return;
    }
    try {
      await prismaClient.$transaction(async (tx) => {
        const currUser = await tx.user.findFirst({
          where: {
            id: userId,
          },
        });

        if (!currUser?.tenantId) {
          res
            .status(400)
            .send({ status: false, error: "tenantId is required" });
          return;
        }
        const SpaceCreation = await tx.space.create({
          data: {
            spaceName: Space,
            userId: userId,
            tenantId: currUser?.tenantId!,
            list: {
              create: {
                listName: List,
                color: RandomColorPicker().hex,
                userId: userId,
              },
            },
          },
          include:{list:true}
        });

        res.status(201).json({ status: true, data: SpaceCreation });
      });
    } catch (error) {
      console.error("Error creating space:", error);
      res.status(500).json({ status: false, error: "Internal server error" });
    }
  }
);
