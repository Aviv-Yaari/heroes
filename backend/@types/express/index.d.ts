import { HydratedDocument } from "mongoose";
import { User } from "../../src/api/user/user.model";

declare global {
  namespace Express {
    interface Request {
      user: HydratedDocument<User>;
    }
  }
}
