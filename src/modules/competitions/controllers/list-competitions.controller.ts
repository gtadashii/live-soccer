import { CompetitionsRepository } from '../../../repositories/competitions.repository';
import { ListCompetitionsUseCase } from '../usecases/list-competitions.usecase';

function bootstrap() {
  const competitionsRepository = new CompetitionsRepository();
  return new ListCompetitionsUseCase(competitionsRepository);
}

export class ListCompetitionsController {
  async handle() {
    console.info('ListCompetitionsController.handle() called');
    try {
      const usecase = bootstrap();
      const competitions = await usecase.execute();
      return new Response(JSON.stringify(competitions), { status: 200 });
    } catch (error) {
      console.error('Error listing competitions', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const listCompetitionsController = new ListCompetitionsController();
