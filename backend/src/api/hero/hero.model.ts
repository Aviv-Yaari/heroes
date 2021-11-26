import { Schema, model, ObjectId } from "mongoose";

export interface Hero {
  name: string;
  ability: "attacker" | "defender";
  colors: string[];
  trainingHistory: { [date: string]: number }[];
  userId: ObjectId;
}

const schema = new Schema<Hero>({
  name: { type: String, required: true, unique: true },
  ability: { type: String, enum: ["attacker", "defender"], required: true },
  colors: { type: [String] },
  trainingHistory: { type: [Object] },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
});

export const HeroModel = model<Hero>("Hero", schema);
