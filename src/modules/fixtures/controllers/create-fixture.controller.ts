import type { Context } from 'elysia';
import { CompetitionsRepository } from '../../../repositories/competitions.repository';
import { FixturesRepository } from '../../../repositories/fixtures.repository';
import { CreateFixtureUseCase } from '../usecases/create-fixture.usecase';
import type { Fixture } from '../../fixtureEvents/fixture.model';
import { CompetitionNotFoundException } from '../../../http/exceptions';

function bootstrap() {
  const competitionsRepository = new CompetitionsRepository();
  const fixturesRepository = new FixturesRepository();
  return new CreateFixtureUseCase(fixturesRepository, competitionsRepository);
}

class CreateFixtureController {
  async handle(context: Context) {
    console.info('CreateFixtureController.handle() called');
    try {
      const usecase = bootstrap();
      const { competitionId, homeTeamId, awayTeamId } = context.body as Fixture;
      const fixtures = await usecase.execute(competitionId, { competitionId, homeTeamId, awayTeamId });
      return new Response(JSON.stringify(fixtures), { status: 200 });
    } catch (error) {
      console.error('Error creating fixture', error);

      if (error instanceof CompetitionNotFoundException) {
        return new Response('Competition not found', { status: 404 });
      }

      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const createFixtureController = new CreateFixtureController();
