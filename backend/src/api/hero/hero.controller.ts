import { RequestHandler } from "express";
import { logger } from "../../services/logger.service";
import * as heroService from "./hero.service";

export const getAll: RequestHandler = async (req, res) => {};
export const getById: RequestHandler = async (req, res) => {};

export const add: RequestHandler = async (req, res) => {
  try {
    const hero = await heroService.add(req.body);
    res.json(hero);
  } catch (err) {
    logger.info("Error in add hero: " + err);
    res.status(500).send({ err });
  }
};

export const train: RequestHandler = async (req, res) => {
  try {
    const trainingHistory = await heroService.train(req.params.id);
    res.json(trainingHistory);
  } catch (err) {
    logger.info("Error in train hero: " + err);
    res.status(500).send({ err });
  }
};

export const assign: RequestHandler = async (req, res) => {
  try {
    let hero;
    const { heroId, userId } = req.params;
    if (req.user.isAdmin) hero = await heroService.assign(heroId, userId);
    else hero = await heroService.assign(heroId, req.user._id);
    res.json(hero);
  } catch (err) {
    logger.info("Error in assign hero: " + err);
    res.status(500).send({ err });
  }
};
