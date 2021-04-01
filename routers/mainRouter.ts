import express from "express";
import {getMainRouter} from "../actions"
const mainRouter = express.Router();

mainRouter.get("/",getMainRouter )

export default mainRouter;