import { Router } from "express";
import { protectedRoutes } from "../middlewares/protectedRoutes";
import { handleCreateList } from "../controller/list-controller";


const listRouter = Router()

listRouter.post('/',protectedRoutes,handleCreateList)



export default listRouter