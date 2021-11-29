import { FilterQuery } from 'mongoose';
import { User, UserModel } from './user.model';

const add = async (userDetails: User) => {
  const user = new UserModel(userDetails);
  await user.save();
};

const query = async (filter: FilterQuery<User>) => {
  const user = await UserModel.findOne(filter);
  return user;
};

export const userService = { add, query };
