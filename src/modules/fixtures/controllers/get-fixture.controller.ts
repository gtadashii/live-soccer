import type { Context } from 'elysia';
import { FixturesRepository } from '../../../repositories/fixtures.repository';
import { GetFixtureUseCase } from '../usecases/get-fixture.usecase';
import { FixtureNotFoundException } from '../../../http/exceptions';

function bootstrap() {
  const fixturesRepository = new FixturesRepository();
  return new GetFixtureUseCase(fixturesRepository);
}

class GetFixtureController {
  async handle(context: Context) {
    console.info('getFixtureController.handle() called');
    try {
      const usecase = bootstrap();
      const { id } = context.params;
      const fixture = await usecase.execute(id);
      return new Response(JSON.stringify(fixture), { status: 200 });
    } catch (error) {
      console.error('Error getting fixture', error);

      if (error instanceof FixtureNotFoundException) {
        return new Response('Fixture not found', { status: 404 });
      }

      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const getFixtureController = new GetFixtureController();
