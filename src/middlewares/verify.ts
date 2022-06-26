import jwt from "jsonwebtoken";
import config from "../../config/config";
import { Request, Response, NextFunction } from "express";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = (authHeader as string).split(" ")[1];
    jwt.verify(token, config.jwt, (err, user) => {
      if (err) {
        res.status(404).json("invalid token");
      } else {
        req.user = user;
      }
      next();
    });
  } else {
    res.status(404).json("UnAuthenticated");
  }
}
