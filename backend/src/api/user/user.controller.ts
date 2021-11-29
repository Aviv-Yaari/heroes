import { RequestHandler } from 'express';
import * as heroService from '../hero/hero.service';

export const add: RequestHandler = async (req, res) => {
  const hero = await heroService.add(req.body);
  res.json(hero);
};
