import { FilterQuery, Types } from 'mongoose';
import { logger } from '../../services/logger.service';
import { UserModel } from '../user/user.model';
import { Hero, HeroModel } from './hero.model';

export const query = async (filter: FilterQuery<Hero>) => {
  const heroes = await HeroModel.find(filter).populate('userId', 'username');
  return heroes;
};

export const add = async (heroDetails: Hero) => {
  const hero = new HeroModel(heroDetails);
  const createdHero = await hero.save();
  logger.info('Created new hero: ' + createdHero);
  return createdHero;
};

export const train = async (id: string) => {
  const hero = await HeroModel.findById(id).populate('userId', 'username');
  if (!hero) throw 'Hero not found';
  if (hero.get('trainsToday') === 5) throw 'Exceeded training day limit';
  const growth = Math.ceil(Math.random() * 10);
  hero.trainingHistory.unshift({ date: Date.now(), power: hero.currentPower + growth });
  await hero.save();
  logger.info('Trained hero: ' + hero._id);
  return hero;
};

export const assign = async (heroId: string, userId: string) => {
  const hero = await HeroModel.findById(heroId);
  if (!hero) throw 'Could not find hero';
  const user = await UserModel.findById(userId);
  if (!user) throw 'User does not exist';
  if (hero.price > user.money) throw 'Not enough money';
  hero.userId = new Types.ObjectId(userId) as any;
  await hero.save();
  await user.updateOne({
    $addToSet: { heroes: new Types.ObjectId(heroId) },
    $inc: { money: hero.price * -1 },
  });
  return hero.populate('userId', 'username');
};

function _checkDayLimit(trainingHistory: Hero['trainingHistory']) {
  // checks training day limit (5 trains per day).
  // returns true if valid, false if exceeded day limit.
  if (trainingHistory.length < 5) return true;
  for (let i = 0; i < 5; i++) {
    const timestamp = +trainingHistory[i].date;
    if (Date.now() - timestamp > 24 * 60 * 60 * 1000) {
      // if more than 24 hours have passed since the training:
      return true;
    }
  }
  return false;
}
