import mongoose from 'mongoose';

export interface Competition {
  name: string;
}

const competitionSchema = new mongoose.Schema({
  name: String,
});

export const CompetitionModel = mongoose.model<Competition>('Competition', competitionSchema);
