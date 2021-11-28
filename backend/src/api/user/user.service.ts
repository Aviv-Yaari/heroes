// import dbService from "../../services/db.service";
import { FilterQuery } from 'mongoose';
import { logger } from '../../services/logger.service';
import { User, UserModel } from './user.model';

const add = async (userDetails: User) => {
  try {
    const user = new UserModel(userDetails);
    await user.save();
    logger.info('New user created: ' + user.username);
  } catch (err) {
    logger.error('Error in create user: ' + err);
    throw err;
  }
};

const query = async (filter: FilterQuery<User>) => {
  try {
    const user = await UserModel.findOne(filter);
    return user;
  } catch (err) {
    logger.error('Error in query users: ' + err);
    throw err;
  }
};

export const userService = { add, query };
