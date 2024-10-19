import * as mongoose from 'mongoose';
import { CompetitionModel, type Competition } from '../modules/competitions/competition.model';

export interface ICompetitionsRepository {
  listCompetitions(): Promise<Competition[] | []>;
  getCompetitionById(id: string): Promise<Competition | null>;
}

export class CompetitionsRepository implements ICompetitionsRepository {
  private Competition = CompetitionModel;

  public constructor() {
    this.connectToDatabase();
  }

  public async listCompetitions() {
    try {
      const competitions = await this.Competition.find();
      return competitions;
    } catch (error) {
      console.error('Error listing competitions', error);
      throw error;
    }
  }

  public async getCompetitionById(id: string) {
    try {
      const competition = await this.Competition.findById(id);
      return competition;
    } catch (error) {
      console.error('Error getting competition by id', error);
      return null;
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
