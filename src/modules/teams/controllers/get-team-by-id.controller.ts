import type { Context } from 'elysia';
import { TeamNotFoundException } from '../../../http/exceptions';
import { TeamsRepository } from '../../../repositories/teams.repository';
import { GetTeamByIdUseCase } from '../usecases/get-team-by-id.usecase';

function bootstrap() {
  const teamsRepository = new TeamsRepository();
  return new GetTeamByIdUseCase(teamsRepository);
}

class GetTeamByIdController {
  async handle(context: Context) {
    console.info('GetTeamByIdController.handle() called');
    try {
      const usecase = bootstrap();
      const { id } = context.params;
      const team = await usecase.execute(id);
      return new Response(JSON.stringify(team), { status: 200 });
    } catch (error) {
      console.error('Error getting team by id', error);
      if (error instanceof TeamNotFoundException) {
        return new Response('No teams found', { status: 404 });
      }
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const getTeamByIdController = new GetTeamByIdController();
