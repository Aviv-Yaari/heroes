import { httpService } from './http.service';

export const query = async (filter: { [key: string]: any }) => {
  const params = new URLSearchParams();
  for (const key in filter) {
    params.append(key, filter[key]);
  }
  const heroes = await httpService.get('hero', params);
  return heroes;
};

export const train = async (heroId: string) => {
  const hero = await httpService.put(`hero/${heroId}/train`);
  return hero;
};

export const heroService = { query, train };
