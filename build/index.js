"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var userRouter_1 = __importDefault(require("./routers/userRouter"));
var mainRouter_1 = __importDefault(require("./routers/mainRouter"));
var mongoose_1 = __importDefault(require("mongoose"));
require("dotenv/config");
var app = express_1.default();
mongoose_1.default.connect("" + process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
app.use(express_1.default.json());
app.use("/", mainRouter_1.default);
app.use("/users", userRouter_1.default);
app.listen("" + process.env.PORT);
