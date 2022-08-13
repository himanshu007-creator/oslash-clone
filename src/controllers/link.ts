import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import shortUrl from "../models/user";

function validURL(myURL: string) {
  var pattern = new RegExp(
    /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/
  );
  return pattern.test(myURL);
}

export async function mainLink(req: Request, res: Response) {
  const ShortLink = req.params["id"];
  const username = await req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  const urls = userfound.links;
  let found = false;
  var ans: any;
  urls.forEach((element: any) => {
    if (element.shortlink === ShortLink) {
      found = true;
      ans = element;
    }
  });
  if (found) {
    const rdrect = ans.url;
    var result = await shortUrl.updateOne(
      { username: username, "links.shortlink": ShortLink },
      { $inc: { "links.$.visits": 1 } }
    );
    res.redirect(rdrect);
  } else {
    res.status(400).json("Not existing");
  }
}
export async function createUrl(req: Request, res: Response) {
  const username = await req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  if (!validURL(req.body.url)) {
    res.status(400).json("Invalid url " + req.body.url);
  } else {
    const link = {
      shortlink: req.body.shortlink.toLowerCase(),
      description: req.body.description,
      url: req.body.url,
      tags: req.body.tags,
      visits: 0,
      created_at: Date.now(),
    };
    const shortl: string = link.shortlink;
    var urls = await userfound.links;
    var valueArr = urls.map(function (item: any) {
      return item.shortlink;
    });
    var isThere = valueArr.some(function (i: string) {
      return i === shortl;
    });
    if (!isThere) {
      const result = await shortUrl.updateOne(
        { username: username },
        { $push: { links: link } }
      );
      res.status(201).json(result);
    } else {
      res.status(400).json("Short URL of same name already exixts");
    }
  }
}

export async function getLinks(req: Request, res: Response) {
  const username = req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  var urls = userfound.links;
  if (req.query.sort == "asc") {
    urls.sort((a: any, b: any) => {
      let fa = a.shortlink.toLowerCase();
      let fb = b.shortlink.toLowerCase();

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  } else if (req.query.sort == "dsc") {
    urls.sort((a: any, b: any) => {
      let fa = a.shortlink.toLowerCase();
      let fb = b.shortlink.toLowerCase();

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
  } else if (req.query.sortdate == "dsc") {
    urls.sort((a: any, b: any) => {
      let fa = Date.parse(a.created_at);
      let fb = Date.parse(b.created_at);

      if (fa < fb) {
        return 1;
      }
      if (fa > fb) {
        return -1;
      }
      return 0;
    });
  } else if (req.query.sortdate == "asc") {
    urls.sort((a: any, b: any) => {
      let fa = Date.parse(a.created_at);
      let fb = Date.parse(b.created_at);

      if (fa < fb) {
        return -1;
      }
      if (fa > fb) {
        return 1;
      }
      return 0;
    });
  }
  res.status(200).json(urls);
}

export async function deleteLink(req: Request, res: Response) {
  const rm = req.params.short;
  const username = req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  var urls = await userfound.links;
  var valueArr = urls.map(function (item: any) {
    return item.shortlink;
  });
  console.log(valueArr);
  var isThere = valueArr.some(function (i: string) {
    return i === rm;
  });
  if (isThere) {
    const result = await shortUrl.updateOne(
      { username: username },
      { $pull: { links: { shortlink: rm } } },
      { multi: true }
    );
    res.status(201).json(result);
  } else {
    res.status(400).json("ShortUrl Invalid ");
  }
}
export async function searchLinks(req: Request, res: Response) {
  const short = req.body.shortlink || null;
  const tag = req.body.tag || null;
  const username = req.user.username;
  const userfound: any = await shortUrl.findOne({ username: username });
  if (userfound) {
    const urls = userfound.links;

    if (short !== null) {
      const result = urls.filter((e: any) => {
        return e.shortlink == short;
      });
      res.status(200).json(result);
    } else if (tag !== null) {
      const Tagresult = urls.filter((e: any) => {
        return e.tags.includes(tag);
      });
      res.status(200).json(Tagresult);
    }
  } else {
    res.status(400).json("USER DON'T EXIXT");
  }
}
//   db.survey.find({
//     results: { $elemMatch: { product: "xyz", score: { $gte: 8 } } },
//   });
// }
