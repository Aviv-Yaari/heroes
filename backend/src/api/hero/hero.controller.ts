import { RequestHandler } from 'express';
import { logger } from '../../services/logger.service';
import * as heroService from './hero.service';

export const getAll: RequestHandler = async (req, res) => {
  try {
    const heroes = await heroService.query(req.query);
    res.json(heroes);
  } catch (err) {
    logger.error('Error in get heroes: ' + err);
    res.status(500).send({ err });
  }
};

export const getById: RequestHandler = async (req, res) => {};

export const add: RequestHandler = async (req, res) => {
  try {
    const hero = await heroService.add(req.body);
    res.json(hero);
  } catch (err) {
    logger.error('Error in add hero: ' + err);
    res.status(500).send({ err });
  }
};

export const train: RequestHandler = async (req, res) => {
  try {
    const hero = await heroService.train(req.params.id);
    res.json(hero);
  } catch (err) {
    logger.error('Error in train hero: ' + err);
    res.status(500).send({ err });
  }
};

export const assign: RequestHandler = async (req, res) => {
  try {
    let hero;
    const { heroId, userId } = req.params;
    const { isAdmin, _id: currentUserId } = req.session.user!;
    if (isAdmin) hero = await heroService.assign(heroId, userId);
    else hero = await heroService.assign(heroId, currentUserId);
    res.json(hero);
  } catch (err) {
    logger.error('Error in assign hero: ' + err);
    res.status(500).send({ err });
  }
};
