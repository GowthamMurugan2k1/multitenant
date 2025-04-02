import { Router } from "express";
import { handleCreateTenant, handleFindTenant,FetchTenant } from "../controller/tenant-controller";
import { protectedRoutes } from "../middlewares/protectedRoutes";

const tenantRouter = Router()

tenantRouter.post('/',protectedRoutes, handleCreateTenant)
tenantRouter.get('/:find',protectedRoutes,handleFindTenant)
tenantRouter.get('/',protectedRoutes,FetchTenant)



export default tenantRouter