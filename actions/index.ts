import userSchema from "../models/userSchema";
import mongoose from "mongoose";

export const getMainRouter = (req: any, res: any, next: any) => {
  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => {
    console.log("db connected!");
  });
  res.send("check /users router for post and get method");
};

export const getUsers = async (req: any, res: any, next: any) => {
  const data = await userSchema.find();
  res.json(data);
};

export const setUser = async (req: any, res: any, next: any) => {
  const user = new userSchema({
    email: req.body.email,
    password: req.body.password,
  });
  const newUser = await user.save();
  res.json(newUser);
};

export const authUser = async (req: any, res: any, next: any) => {
  console.log("auth middleware works");
  next();
};
