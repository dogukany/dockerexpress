import express from "express";
import {authUser, getUsers, setUser} from "../actions"
const userRouter = express.Router();

userRouter.get("/",authUser,getUsers)
userRouter.post("/",setUser)


export default userRouter;