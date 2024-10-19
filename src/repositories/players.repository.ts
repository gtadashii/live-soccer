import * as mongoose from 'mongoose';
import { PlayerModel, type Player } from '../modules/players/player.model';

export interface IPlayerRepository {
  listByTeamId(teamId: string): Promise<Player[] | []>;
}

export class PlayersRepository implements IPlayerRepository {
  private Player = PlayerModel;

  public constructor() {
    this.connectToDatabase();
  }

  public async listByTeamId(teamId: string) {
    try {
      const players = await this.Player.find({ teamId });
      return players;
    } catch (error) {
      console.error('Error listing players', error);
      throw error;
    }
  }

  private async connectToDatabase() {
    try {
      await mongoose.connect('mongodb://localhost:27017/futebol-live');
      console.log('Connected to database');
    } catch (error) {
      console.error('Error connecting to database', error);
    }
  }
}
