import { FilterQuery, Types } from 'mongoose';
import { ExpressError } from '../../services/error.service';
import { UserModel } from '../user/user.model';
import { Hero, HeroModel } from './hero.model';

const query = async (filter: FilterQuery<Hero>) => {
  const criteria: FilterQuery<Hero> = {};
  if (filter.userId) criteria.userId = filter.userId;
  if (filter.userId === 'none') criteria.userId = { $exists: false };
  if (filter.ability) criteria.ability = filter.ability;
  if (filter.minPower && filter.maxPower) criteria.power = { $gte: +filter.minPower, $lte: +filter.maxPower };
  const heroes = await HeroModel.find(criteria).sort({ power: -1 });
  return heroes;
};

const add = async (heroDetails: Hero) => {
  const hero = new HeroModel(heroDetails);
  const createdHero = await hero.save();
  return createdHero;
};

const train = async (id: string, userId: string) => {
  const hero = await HeroModel.findById(id);
  if (!hero) throw new ExpressError('Hero not found', 404);
  if (hero.get('trainsToday') === 5) throw new ExpressError('Exceeded day training limit', 400);
  const growth = Math.ceil(Math.random() * 10);
  hero.trainingHistory.unshift({ date: Date.now(), power: hero.power + growth });
  hero.power += growth;
  await hero.save();
  await UserModel.updateOne({ _id: userId }, { $inc: { money: growth * 50 } });
  return hero;
};

const assign = async (heroId: string, userId: string) => {
  const hero = await HeroModel.findById(heroId);
  if (!hero) throw new ExpressError('Could not find hero', 404);
  const user = await UserModel.findById(userId);
  if (!user) throw new ExpressError('Could not find user', 404);
  if (hero.price > user.money) throw new ExpressError('Not enough money', 400);
  hero.userId = new Types.ObjectId(userId) as any;
  await hero.save();
  await user.updateOne({
    $addToSet: { heroes: new Types.ObjectId(heroId) },
    $inc: { money: hero.price * -1 },
  });
  return hero.populate('userId', 'username');
};

export const heroService = { query, add, train, assign };
