import 'express-session';
import { MiniUser } from './src/api/user/user.model';
declare module 'express-session' {
  interface SessionData {
    user: MiniUser;
  }
}
