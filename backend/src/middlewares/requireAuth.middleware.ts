import { RequestHandler } from "express-serve-static-core";
import { logger } from "../services/logger.service";

export const requireAuth: RequestHandler = (req, res, next) => {
  //   if (!req.session || !req.session.user) {
  //     res.status(401).end("Not authenticated, Please Login");
  //     return;
  //   }
  next();
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  //   const user = req.session.user;
  //   if (!user.isAdmin) {
  //     logger.warn(user.fullname + " Attempt to perform admin action");
  //     res.status(403).end("Unauthorized Enough..");
  //     return;
  //   }
  next();
};
