"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var actions_1 = require("../actions");
var mainRouter = express_1.default.Router();
mainRouter.get("/", actions_1.getMainRouter);
exports.default = mainRouter;
