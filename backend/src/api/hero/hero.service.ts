import { logger } from "../../services/logger.service";
import { Hero, HeroModel } from "./hero.model";

export const add = async (heroDetails: Hero) => {
  try {
    const hero = new HeroModel(heroDetails);
    const createdHero = await hero.save();
    logger.info("Created new hero: " + createdHero);
    return createdHero;
  } catch (err) {
    logger.error("Error in add hero: " + err);
    throw err;
  }
};
