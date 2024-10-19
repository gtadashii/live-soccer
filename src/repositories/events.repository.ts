import * as mongoose from 'mongoose';
import { EventModel, type Event } from '../modules/events/event.model';

export interface IEventRepository {
  listEvents(): Promise<Event[] | []>;
}

export class EventsRepository implements IEventRepository {
  private Event = EventModel;

  public constructor() {
    this.connectToDatabase();
  }

  public async listEvents() {
    try {
      const events = await this.Event.find();
      return events;
    } catch (error) {
      console.error('Error listing events', error);
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
