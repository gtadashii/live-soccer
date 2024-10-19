import * as mongoose from 'mongoose';
import { FixtureModel, type Fixture } from '../modules/fixtureEvents/fixture.model';

export interface IFixturesRepository {
  createFixture(fixture: Fixture): Promise<Fixture>;
  getFixturesByCompetitionId(competitionId: string): Promise<Fixture[] | []>;
  getFixtureById(id: string): Promise<Fixture | null>;
  updateFixture(id: string, fixture: Fixture): Promise<Fixture | null>;
}

export class FixturesRepository implements IFixturesRepository {
  private Fixture = FixtureModel;

  public constructor() {
    this.connectToDatabase();
  }

  public async createFixture(fixture: Fixture) {
    try {
      const newFixture = await this.Fixture.create(fixture);
      return newFixture;
    } catch (error) {
      console.error('Error creating fixture', error);
      throw error;
    }
  }

  public async getFixturesByCompetitionId(competitionId: string) {
    try {
      const fixtures = await this.Fixture.find({ competitionId });
      return fixtures;
    } catch (error) {
      console.error('Error getting fixtures by competition id', error);
      return [];
    }
  }

  public async getFixtureById(id: string) {
    try {
      const fixture = await this.Fixture.findById(id);
      return fixture;
    } catch (error) {
      console.error('Error getting fixture by id', error);
      return null;
    }
  }

  public async updateFixture(id: string, fixture: Fixture) {
    try {
      const updatedFixture = await this.Fixture.findByIdAndUpdate(id, fixture, { new: true });
      return updatedFixture;
    } catch (error) {
      console.error('Error updating fixture', error);
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
