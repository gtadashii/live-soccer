import mongoose from 'mongoose';

export interface Fixture {
  competitionId: string;
  homeTeamId: string;
  awayTeamId: string;
  createdAt?: Date;
}

const fixtureSchema = new mongoose.Schema({
  competitionId: String,
  homeTeamId: String,
  awayTeamId: String,
  createdAt: { type: Date, default: Date.now },
});

export const FixtureModel = mongoose.model<Fixture>('Fixture', fixtureSchema);
