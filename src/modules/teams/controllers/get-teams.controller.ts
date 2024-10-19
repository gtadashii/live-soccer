import { TeamsRepository } from '../../../repositories/teams.repository';
import { GetTeamsUseCase } from '../usecases/get-teams.usecase';
import { TeamNotFoundException } from '../../../http/exceptions';

function bootstrap() {
  const teamsRepository = new TeamsRepository();
  return new GetTeamsUseCase(teamsRepository);
}

class GetTeamsController {
  async handle() {
    console.info('GetTeamsController.handle() called');
    try {
      const usecase = bootstrap();
      const teams = await usecase.execute();
      return new Response(JSON.stringify(teams), { status: 200 });
    } catch (error) {
      console.error('Error getting teams', error);
      if (error instanceof TeamNotFoundException) {
        return new Response('No teams found', { status: 404 });
      }
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const getTeamsController = new GetTeamsController();
