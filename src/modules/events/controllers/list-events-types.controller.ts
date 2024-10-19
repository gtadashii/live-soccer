import { EventsRepository } from '../../../repositories/events.repository';
import { ListEventsTypesUseCase } from '../usecases/list-events-types.usecase';

function bootstrap() {
  const eventsRepository = new EventsRepository();
  return new ListEventsTypesUseCase(eventsRepository);
}

class ListEventsTypesController {
  async handle() {
    console.info('ListEventsTypesController.handle() called');
    try {
      const usecase = bootstrap();
      const events = await usecase.execute();
      return new Response(JSON.stringify(events), { status: 200 });
    } catch (error) {
      console.error('Error listing event types', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const listEventsTypesController = new ListEventsTypesController();
