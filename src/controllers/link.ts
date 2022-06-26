import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import shortUrl from "../models/user";

export async function mainLink(req: Request, res: Response) {
  const ShortLink = req.params["id"];
  const username = await req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  const actuallink = userfound.links.find(function (elem: any) {
    return (elem.shortlink = ShortLink);
  });
  res.redirect(actuallink.url);
}
export async function createUrl(req: Request, res: Response) {
  const username = req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  const link = {
    shortlink: req.body.shortlink,
    description: req.body.description,
    url: req.body.url,
    tags: req.body.tags,
    visits: 0,
  };
  const result = await userfound.updateOne(
    { username: username },
    { $addToSet: { links: link } }
  );
  res.status(208).json(result);

  //shortUrl.updateOne({}, { $push: { achieve: 95 } });
}

export async function getLinks(req: Request, res: Response) {
  const username = req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  res.status(200).json(userfound.links);
}

export async function deleteLink(req: Request, res: Response) {}
export async function searchLinks(req: Request, res: Response) {}
