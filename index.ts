import express from "express";
import userRouter from "./routers/userRouter";
import mainRouter from "./routers/mainRouter";
import mongoose from "mongoose";
import "dotenv/config";
const app = express();

mongoose.connect(`${process.env.URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
app.use(express.json());

app.use("/", mainRouter);
app.use("/users", userRouter);

app.listen(`${process.env.PORT}`);
