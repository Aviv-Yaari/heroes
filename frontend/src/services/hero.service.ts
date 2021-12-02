import { httpService } from './http.service';

export interface Hero {
  _id: string;
  name: string;
  ability: 'attacker' | 'defender';
  colors: string[];
  trainingHistory: { date: number; power: number }[];
  power: number;
  trainsToday: number;
  userId?: { _id: string; username: string };
  price: number;
}

const query = async (filter?: { [key: string]: any }) => {
  const params = new URLSearchParams();
  for (const key in filter) {
    params.append(key, filter[key]);
  }
  const heroes = await httpService.get('hero', params);
  return heroes as Hero[];
};

const getById = async (id: string) => {
  const hero = await httpService.get(`hero/${id}`);
  return hero;
};

const train = async (heroId: string) => {
  const hero = await httpService.put(`hero/${heroId}/train`);
  return hero;
};

const buy = async (heroId: string) => {
  const hero = await httpService.put(`hero/${heroId}/assign`);
  return hero;
};

const add = async (hero: object) => {
  await httpService.post('hero', hero);
};

export const heroService = { query, getById, train, buy, add };
