import mongoose from 'mongoose';

export enum EventRelatedToEnum {
  PLAYER = 'player',
  TEAM = 'team',
  MATCH = 'match',
}

export interface Event {
  eventType: string;
  label: string;
  relatedTo: EventRelatedToEnum;
}

const eventSchema = new mongoose.Schema({
  eventType: String,
  label: String,
  relatedTo: String,
});

export const EventModel = mongoose.model<Event>('Event', eventSchema);
