import { RequestHandler } from "express";
import * as heroService from "../hero/hero.service";
// import logger from "../../services/logger.service";

export const add: RequestHandler = async (req, res) => {
  try {
    const hero = await heroService.add(req.body);
    res.json(hero);
  } catch (err) {
    res.status(500).send({ err });
  }
};
