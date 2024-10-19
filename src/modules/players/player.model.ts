import mongoose from 'mongoose';

export interface Player {
  name: string;
  teamId: string;
  position: string;
  playerNumber: string;
}

const playerSchema = new mongoose.Schema({
  name: String,
  teamId: String,
  position: String,
  playerNumber: String,
});

export const PlayerModel = mongoose.model<Player>('Player', playerSchema);
