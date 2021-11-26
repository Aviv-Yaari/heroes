import { Schema, model, ObjectId } from "mongoose";

export interface User {
  username: string;
  password: string;
  fullname: string;
  heroIds: ObjectId[];
}

const schema = new Schema<User>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  fullname: { type: String, required: true },
  heroIds: [{ type: Schema.Types.ObjectId, ref: "Hero" }],
});

export const UserModel = model<User>("User", schema);
