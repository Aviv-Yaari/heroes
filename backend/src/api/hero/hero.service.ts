import { Types } from "mongoose";
import { logger } from "../../services/logger.service";
import { UserModel } from "../user/user.model";
import { Hero, HeroModel } from "./hero.model";

export const add = async (heroDetails: Hero) => {
  const hero = new HeroModel(heroDetails);
  const createdHero = await hero.save();
  logger.info("Created new hero: " + createdHero);
  return createdHero;
};

export const train = async (id: string) => {
  const hero = await HeroModel.findById(id);
  if (!hero) throw "Hero not found";
  if (!_checkDayLimit(hero.trainingHistory)) throw "Exceeded training day limit";
  const growth = Math.ceil(Math.random() * 10);
  hero.trainingHistory.unshift({ [Date.now()]: hero.currentPower + growth });
  await hero.save();
  logger.info("Trained hero: " + hero._id);
  return hero.trainingHistory;
};

export const assign = async (heroId: string, userId: string) => {
  const updatedHero = await HeroModel.findByIdAndUpdate(heroId, {
    userId: new Types.ObjectId(userId) as any,
  });
  await UserModel.findByIdAndUpdate(userId, {
    $addToSet: { heroIds: new Types.ObjectId(heroId) },
  });
  return updatedHero;
};

function _checkDayLimit(trainingHistory: Hero["trainingHistory"]) {
  // checks training day limit (5 trains per day).
  // returns true if valid, false if exceeded day limit.
  if (trainingHistory.length < 5) return true;
  for (let i = 0; i < 5; i++) {
    const timestamp = +Object.keys(trainingHistory[i])[0];
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      // if more than 24 hours have passed since the training:
      return true;
    }
  }
  return false;
}
