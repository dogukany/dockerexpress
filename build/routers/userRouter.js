"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var actions_1 = require("../actions");
var userRouter = express_1.default.Router();
userRouter.get("/", actions_1.authUser, actions_1.getUsers);
userRouter.post("/", actions_1.setUser);
exports.default = userRouter;
