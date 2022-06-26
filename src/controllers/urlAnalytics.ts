import shortUrl from "../models/user";
import config from "../../config/config";
import cryptoJs from "crypto-js";
import jwt from "jsonwebtoken";
import { Request, Response } from "express";

export async function urlStats(req: Request, res: Response) {
  const userData: any = req.user;
  const stats: any = await shortUrl.findOne({ id: userData.id });
  res.status(200).json(stats.links);
  //   try {
  //     const orders = await Order.find({ sellerId: user.id });
  //     if (orders.length == 0 || !orders) res.status(400).json("No orders found");
  //     res.status(400).json(orders);
  //   } catch (err) {
  //     res.status(400).json("Unable to get orders RN");
  //   }
}
