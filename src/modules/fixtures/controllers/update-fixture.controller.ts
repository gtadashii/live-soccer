import type { Context } from 'elysia';
import { FixturesRepository } from '../../../repositories/fixtures.repository';
import { UpdateFixtureUsecase } from '../usecases/update-fixture.usecase';
import type { Fixture } from '../../fixtureEvents/fixture.model';

function bootstrap() {
  const fixturesRepository = new FixturesRepository();
  return new UpdateFixtureUsecase(fixturesRepository);
}

class UpdateFixtureController {
  public async handle(context: Context) {
    console.info('updateFixtureController.handle() called');
    try {
      const usecase = bootstrap();
      const { id } = context.params;
      const fixture = context.body;
      const updatedFixture = await usecase.execute(id, fixture as Fixture);
      return new Response(JSON.stringify(updatedFixture), { status: 200 });
    } catch (error) {
      console.error('Error updating fixture', error);
      return new Response('Internal server error', { status: 500 });
    }
  }
}

export const updateFixtureController = new UpdateFixtureController();
