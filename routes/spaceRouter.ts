import { Router } from "express";
import { protectedRoutes } from "../middlewares/protectedRoutes";
import { handleCreateSpace } from "../controller/space-controller";
import { handleGetUserSpace } from "../controller/user-controller";


const spaceRouter = Router()

spaceRouter.post('/',protectedRoutes,handleCreateSpace)
spaceRouter.get('/:userId',protectedRoutes,handleGetUserSpace)


export default spaceRouter