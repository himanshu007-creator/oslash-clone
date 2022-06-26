import { Request, Response } from "express";
import shortUrl from "../models/user";
import config from "../../config/config";
import cryptoJs from "crypto-js";
import jwt from "jsonwebtoken";

var refreshTokens: string[] = [];

export function logout(req: Request, res: Response) {
  refreshTokens = refreshTokens.filter((token) => token !== req.body.token);
  res.status(204).json("LOGGED OUT");
}

export function generateToken(req: Request, res: Response) {
  const refreshtoken = req.body.token;
  if (refreshtoken == null) return res.status(401);
  //  else if (!refreshTokens.includes(refreshtoken)) return res.status(403);
  jwt.verify(refreshtoken, config.jwt, (err: any, user: any) => {
    if (err) {
      return res.status(403);
    }
    type token = {
      username?: string;
    };
    const Token: token = {
      username: user.username,
    };
    const AccessToken: any = jwt.sign(Token, config.jwt, { expiresIn: "10m" });
    res.status(200).json({ accessToken: AccessToken });
  });
}

export async function loginUser(req: Request, res: Response) {
  try {
    const user: any = await shortUrl.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong credentials");

    const hashpassword = cryptoJs.AES.decrypt(user.password, config.hash);
    const Origpassword = hashpassword.toString(cryptoJs.enc.Utf8);
    Origpassword !== req.body.password &&
      res.status(401).json("wrong credentials");
    type token = {
      username?: string;
    };
    const Token: token = {
      username: user.username,
    };
    const AccessToken: any = jwt.sign(Token, config.jwt, { expiresIn: "10m" });
    const refreshtoken: any = jwt.sign(Token, config.jwt);
    const { password, ...others } = user._doc;
    res
      .status(200)
      .json({ accesstoken: AccessToken, refreshtoken: refreshtoken });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
}

export async function registerUser(req: Request, res: Response) {
  const user = new shortUrl({
    username: req.body.username,
    password: cryptoJs.AES.encrypt(req.body.password, config.hash),
  });

  try {
    const saveuser: any = await user.save();
    console.log("USer registered");
    res.status(200).json(saveuser);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
}
