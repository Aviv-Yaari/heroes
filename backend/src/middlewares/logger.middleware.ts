import { RequestHandler } from "express";
import { logger } from "../services/logger.service";

export const log: RequestHandler = (req, res, next) => {
  //   if (req.session && req.session.user) {
  // logger.info("Req from: " + req.session.user.fullname);
  //   }
  logger.info("request");
  next();
};
