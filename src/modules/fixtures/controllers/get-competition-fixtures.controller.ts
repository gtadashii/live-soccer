import type { Context } from 'elysia';
import { FixturesRepository } from '../../../repositories/fixtures.repository';
import { GetCompetitionFixturesUseCase } from '../usecases/get-competition-fixtures.usecase';

function bootstrap() {
  const fixturesRepository = new FixturesRepository();
  return new GetCompetitionFixturesUseCase(fixturesRepository);
}

class GetCompetitionFixturesController {
  public async handle(context: Context) {
    console.info('getCompetitionFixturesController.handle() called');
    try {
      const usecase = bootstrap();
      const { competitionId } = context.params;
      const fixtures = await usecase.execute(competitionId);
      return new Response(JSON.stringify(fixtures), { status: 200 });
    } catch (error) {
      console.error('Error getting fixtures', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const getCompetitionFixturesController = new GetCompetitionFixturesController();
