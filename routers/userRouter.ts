import express from "express";
import {authUser, getUsers, reToken, setUser} from "../actions"
const userRouter = express.Router();

userRouter.get("/",authUser,getUsers)
userRouter.post("/retoken", reToken)
userRouter.post("/",setUser)


export default userRouter;