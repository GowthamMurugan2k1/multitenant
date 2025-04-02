import { Response, Request } from "express";
import { CatchAsyncHandler } from "../middlewares/error-middleware";
import { prismaClient } from "../lib/prismaClient.js";
import { AuthRequest } from "../types/common";

export const handleCreateTenant = CatchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const { tenantName } = req.body;

    if (!tenantName) {
      res.status(400).json({
        status: false,
        message: "Company or project Name is required",
      });
      return;
    }
    const userId = req.user;
    const isExist = await prismaClient.user.findUnique({
      where:{
        id:userId
      }
    });
    

    if (isExist?.tenantId) {
      res.status(400).json({
        status: false,
        message: "you can't create multiple Base.",
      });
      return;
    }

    await prismaClient.$transaction(async (tx) => {
      const tenantdetails = await tx.tenant.create({
        data: {
          name: tenantName,
        },
        select: {
          name: true,
          id: true,
        },
      });
      await tx.user.update({
        where: {
          id: userId,
        },
        data: {
          tenantId: tenantdetails.id,
        },
      });
      res.status(201).send({ status: true, message: tenantdetails });
      return;
    });
  }
);

export const handleFindTenant = CatchAsyncHandler(
  async (req: Request, res: Response) => {
    const { find } = req.params;
    if (!find) {
      res.status(400).send({ status: false, message: "query is required" });
      return;
    }
    if (find.length < 3) {
      res.status(400).send({
        status: false,
        message: "Base name should have more than three letters.",
      });
      return;
    }
    const isExist = await prismaClient.tenant.findUnique({
      where: {
        name: find.toLocaleLowerCase(),
      },
    });

    const isAvailable = isExist ? false : true;
    res.status(200).send({ status: true, message: isAvailable });
  }
);

// Fetch tenant
export const FetchTenant = CatchAsyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user;
    if (!userId) {
      res.status(400).send({ status: false, message: "userid is missing" });
      return;
    }

    await prismaClient.$transaction(async (tx) => {
      const tenantID = await tx.user.findFirst({
        where: {
          id: userId,
        },
        select: {
          tenantId: true,
        },
      });

      if (!tenantID || !tenantID.tenantId) {
        res.status(400).send({ status: false, error: "tenantId is required" });
        return;
      }
      const UserTenant = await prismaClient.tenant.findUnique({
        where: {
          id: tenantID.tenantId!,
        },
        select: {
          name: true,
          space: {
            include: {
              list: true,
            },
          },
        },
      });
      res.status(200).send({ status: true, message: UserTenant });
    });
  }
);
