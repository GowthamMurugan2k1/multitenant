import { Router } from "express";
import userRouter from "./userRoute";
import taskRouter from "./taskRouter";
import spaceRouter from "./spaceRouter";
import tenantRouter from "./tenant";
import listRouter from "./listRouter";

const router = Router()

router.use('/user',userRouter)
router.use('/task',taskRouter)
router.use('/space',spaceRouter)
router.use('/tenant',tenantRouter)
router.use('/list',listRouter)

export default router