import userSchema from "../models/userSchema";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const getMainRouter = (req: any, res: any, next: any) => {
  res.send("check /users router for post and get method");
};

export const getUsers = async (req: any, res: any, next: any) => {
  await userSchema.findOne(
    { email: req.user.email },
    (err: any, myUser: any) => {
      if (err) {
        console.log(err.message);
      } else {
        res.json(myUser);
      }
    }
  );
};

export const setUser = async (req: any, res: any, next: any) => {
  const userheader = { email: req.body.email };
  const accessToken = jwt.sign(userheader, `${process.env.ACCESS_TOKEN}`, {
    expiresIn: "15s",
  });
  const refreshToken = jwt.sign(userheader, `${process.env.REFRESH_TOKEN}`);

  const user = new userSchema({
    email: req.body.email,
    password: req.body.password,
    refreshToken: refreshToken,
  });
  try {
    await user.save();
    res.json({
      accesstoken: accessToken,
      refreshtoken: refreshToken,
      message: "user created",
    });
  } catch (err) {
    return res.sendStatus(401);
  }
};

export const authUser = async (req: any, res: any, next: any) => {
  const header = req.headers["authorization"];
  const token = header && header.split(" ")[1];
  if (token == null && header == null) {
    res.sendStatus(401);
  } else {
    jwt.verify(token, `${process.env.ACCESS_TOKEN}`, (err: any, user: any) => {
      if (err) {
        res.sendStatus(401);
      } else {
        req.user = user;
        next();
      }
    });
  }
};

export const reToken = async (req: any, res: any, next: any) => {
  const refreshToken = req.body.token;

  let userToken: string = "";
  if (refreshToken === null) return res.sendStatus(401);
  await userSchema.findOne(
    { email: req.body.email },
    (err: any, myUser: any) => {
      if (err || myUser === null) {
        res.sendStatus(401);
      } else {
        userToken = myUser.refreshToken;
        if (!userToken.includes(refreshToken)) return res.sendStatus(401);
        jwt.verify(
          refreshToken,
          `${process.env.REFRESH_TOKEN}`,
          (err: any, user: any) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign(
              { email: req.body.email },
              `${process.env.ACCESS_TOKEN}`,
              {
                expiresIn: "15s",
              }
            );
            res.json({ accessToken: accessToken });
          }
        );
      }
    }
  );
};
