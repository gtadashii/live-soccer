import mongoose from 'mongoose';

export interface Team {
  name: string;
  commonName: string;
  acronym: string;
  stadiumName: string;
  managerName: string;
}

const teamSchema = new mongoose.Schema({
  name: String,
  commonName: String,
  acronym: String,
  stadiumName: String,
  managerName: String,
});

export const TeamModel = mongoose.model<Team>('Team', teamSchema);
