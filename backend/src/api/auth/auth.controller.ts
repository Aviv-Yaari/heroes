import { RequestHandler } from "express";
import { logger } from "../../services/logger.service";
import { User } from "../user/user.model";
import authService from "./auth.service";

export const login: RequestHandler = async (req, res) => {
  const { username, password } = req.body;
  try {
    const token = await authService.login(username, password);
    res.send(token);
  } catch (err) {
    logger.error("Failed to Login " + err);
    res.status(401).send({ err: "Failed to login: " + err });
  }
};

export const signup: RequestHandler = async (req, res) => {
  try {
    const user: User = req.body;
    await authService.signup(user);
    const token = await authService.login(user.username, user.password);
    res.send(token);
  } catch (err) {
    logger.error("Failed to signup: " + err);
    res.status(500).send({ err });
  }
};
