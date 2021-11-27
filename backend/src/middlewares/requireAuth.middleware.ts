import { RequestHandler } from "express-serve-static-core";
import { logger } from "../services/logger.service";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../api/user/user.model";
import { HydratedDocument } from "mongoose";
import { userService } from "../api/user/user.service";

export const requireAuth: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).end("Not authenticated, please login");
  try {
    const { username } = <JwtPayload>jwt.verify(token, <jwt.Secret>process.env.JWT_SECRET);
    req.user = <HydratedDocument<User>>await userService.getByUsername(username);
    next();
  } catch (err) {
    logger.error("Authentication error: " + err);
    return res.status(403).end("Authentication error");
  }
};

export const requireAdmin: RequestHandler = (req, res, next) => {
  const user = req.user;
  if (!user || !user.isAdmin) {
    logger.warn("Attempt to perform admin action by username: " + user.username);
    return res.status(403).end("Unauthorized");
  }
  next();
};
