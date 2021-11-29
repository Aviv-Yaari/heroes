import { Schema, model, ObjectId } from 'mongoose';

export interface User {
  username: string;
  password: string;
  fullname: string;
  heroes?: ObjectId[];
  isAdmin: boolean;
  money: number;
}

const schema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  heroes: [{ type: Schema.Types.ObjectId, ref: 'Hero' }],
  isAdmin: { type: Boolean, default: false },
  money: { type: Number, default: 0 },
});

export const UserModel = model<User>('User', schema);
