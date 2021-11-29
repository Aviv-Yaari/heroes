import { httpService } from './http.service';

export interface Hero {
  _id: string;
  name: string;
  ability: 'attacker' | 'defender';
  colors: string[];
  trainingHistory: { date: number; power: number }[];
  currentPower: number;
  trainsToday: number;
  userId?: { _id: string; username: string };
  price: number;
}

// export interface PopulatedHero extends Omit<Hero, 'userId'> {
//   userId: { _id: string; username: string };
// }

export const query = async (filter?: { [key: string]: any }) => {
  const params = new URLSearchParams();
  for (const key in filter) {
    params.append(key, filter[key]);
  }
  const heroes = await httpService.get('hero', params);
  return heroes as Hero[];
};

export const train = async (heroId: string) => {
  const hero = await httpService.put(`hero/${heroId}/train`);
  return hero;
};

export const buy = async (heroId: string) => {
  const hero = await httpService.put(`hero/${heroId}/assign`);
  return hero;
};

export const add = async (hero: object) => {
  await httpService.post('hero', hero);
};

export const heroService = { query, train, buy, add };
