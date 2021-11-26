import { RequestHandler } from "express";
import * as heroService from "./hero.service";

export const getAll: RequestHandler = async (req, res) => {};
export const getById: RequestHandler = async (req, res) => {};

export const add: RequestHandler = async (req, res) => {
  try {
    const hero = await heroService.add(req.body);
    res.json(hero);
  } catch (err) {
    res.status(500).send({ err });
  }
};
