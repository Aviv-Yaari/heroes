import { RequestHandler } from 'express';
import * as heroService from './hero.service';

export const getAll: RequestHandler = async (req, res) => {
  const heroes = await heroService.query(req.query);
  res.json(heroes);
};

export const getById: RequestHandler = async (req, res) => {};

export const add: RequestHandler = async (req, res) => {
  const hero = await heroService.add(req.body);
  res.json(hero);
};

export const train: RequestHandler = async (req, res) => {
  const hero = await heroService.train(req.params.id);
  res.json(hero);
};

export const assign: RequestHandler = async (req, res) => {
  let hero;
  const { heroId, userId } = req.params;
  const { isAdmin, _id: currentUserId } = req.session.user!;
  if (isAdmin) hero = await heroService.assign(heroId, userId);
  else hero = await heroService.assign(heroId, currentUserId);
  res.json(hero);
};
