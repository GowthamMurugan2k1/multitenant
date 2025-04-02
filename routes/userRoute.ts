import {Router } from "express";
import { handleCreateUser, handleEmailLogin, handleGetUser, handleGoogleSignIn , handleRevalidate} from "../controller/user-controller";
import { protectedRoutes } from "../middlewares/protectedRoutes";


const userRouter = Router()

userRouter.get('/',handleGetUser)
userRouter.post('/Google_register',handleGoogleSignIn)
userRouter.post("/register", handleCreateUser)
userRouter.post("/login", handleEmailLogin)
userRouter.post("/revalidate", handleRevalidate)



export default userRouter