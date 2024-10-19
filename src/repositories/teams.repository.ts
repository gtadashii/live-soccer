import * as mongoose from 'mongoose';
import { TeamModel, type Team } from '../modules/teams/team.model';

export interface ITeamRepository {
  list(): Promise<Team[]>;
  find(id: string): Promise<Team | null>;
}

export class TeamsRepository implements ITeamRepository {
  private Team = TeamModel;

  public constructor() {
    this.connectToDatabase();
  }

  public async list() {
    try {
      const teams = await this.Team.find();
      return teams;
    } catch (error) {
      console.error('Error listing teams', error);
      throw error;
    }
  }

  public async find(id: string) {
    return this.Team.findById({ _id: id });
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
