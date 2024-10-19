import type { IEventRepository } from '../../../repositories/events.repository';
import type { Event } from '../event.model';

export class ListEventsTypesUseCase {
  constructor(private eventsRepository: IEventRepository) {}

  public async execute(): Promise<Event[]> {
    const events = await this.eventsRepository.listEvents();

    return events;
  }
}
