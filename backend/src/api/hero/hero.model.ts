import { Schema, model, ObjectId } from 'mongoose';

export interface Hero {
  name: string;
  ability: 'attacker' | 'defender';
  colors: string[];
  trainingHistory: { date: number; power: number }[];
  userId: ObjectId;
  currentPower: number;
  price: number;
}

const schema = new Schema<Hero>({
  name: { type: String, required: true, unique: true },
  ability: { type: String, enum: ['attacker', 'defender'], required: true },
  colors: [String],
  trainingHistory: [Object],
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  price: { type: Number, default: 0 },
});

schema.virtual('currentPower').get(function (this: Hero) {
  return this.trainingHistory[0]?.power || 0;
});

schema.virtual('trainsToday').get(function (this: Hero) {
  let count = 0;
  for (const training of this.trainingHistory) {
    if (Date.now() - training.date > 24 * 60 * 60 * 1000) return count;
    else count++;
  }
  return count;
});

schema.set('toObject', { virtuals: true });
schema.set('toJSON', { virtuals: true });

schema.pre('find', function () {
  this.populate('userId', 'username');
});

export const HeroModel = model<Hero>('Hero', schema);
