// import dbService from "../../services/db.service";
import { logger } from "../../services/logger.service";
import { User, UserModel } from "./user.model";

const add = async (userDetails: User) => {
  try {
    const user = new UserModel(userDetails);
    await user.save();
    logger.info("New user created: " + user.username);
  } catch (err) {
    logger.error("Error in create user: " + err);
    throw err;
  }
};

const getByUsername = async (username: string) => {
  try {
    const user = await UserModel.findOne({ username });
    return user;
  } catch (err) {
    logger.error("Error in get by username: " + err);
    throw err;
  }
};

export const userService = { add, getByUsername };
