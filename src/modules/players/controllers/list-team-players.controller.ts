import type { Context } from 'elysia';
import { PlayersRepository } from '../../../repositories/players.repository';
import { TeamsRepository } from '../../../repositories/teams.repository';
import { ListTeamPlayersUseCase } from '../usecases/list-team-players.usecase';
import { TeamNotFoundException } from '../../../http/exceptions';

function bootstrap() {
  const teamsRepository = new TeamsRepository();
  const playersRepository = new PlayersRepository();
  return new ListTeamPlayersUseCase(teamsRepository, playersRepository);
}

class ListTeamPlayersController {
  async handle(context: Context) {
    console.info('ListTeamPlayersController.handle() called');
    try {
      const usecase = bootstrap();
      const { id } = context.params;
      const players = await usecase.execute(id);
      return new Response(JSON.stringify(players), { status: 200 });
    } catch (error) {
      console.error('Error listing team players', error);
      if (error instanceof TeamNotFoundException) {
        return new Response('No teams found', { status: 404 });
      }
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const listTeamPlayersController = new ListTeamPlayersController();
