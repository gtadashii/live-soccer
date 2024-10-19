import swagger from '@elysiajs/swagger';
import Elysia from 'elysia';

import { getTeamsController } from '../../modules/teams/controllers/get-teams.controller';
import { getTeamByIdController } from '../../modules/teams/controllers/get-team-by-id.controller';
import { listTeamPlayersController } from '../../modules/players/controllers/list-team-players.controller';
import { listEventsTypesController } from '../../modules/events/controllers/list-events-types.controller';
import { listCompetitionsController } from '../../modules/competitions/controllers/list-competitions.controller';
import { createFixtureController } from '../../modules/fixtures/controllers/create-fixture.controller';
import { createAndUpdateFixtureSchema } from '../validations/fixture.schema.validation';
import { getFixtureController } from '../../modules/fixtures/controllers/get-fixture.controller';
import { getCompetitionFixturesController } from '../../modules/fixtures/controllers/get-competition-fixtures.controller';
import { updateFixtureController } from '../../modules/fixtures/controllers/update-fixture.controller';

const app = new Elysia();

app.use(swagger());

app
  .get('/', () => 'Hello World')
  .get('/teams', () => getTeamsController.handle())
  .get('/teams/:id', (context) => getTeamByIdController.handle(context))
  .get('/teams/:id/players', (context) => listTeamPlayersController.handle(context))
  .get('/events', () => () => listEventsTypesController.handle())
  .get('/competitions', () => listCompetitionsController.handle())
  .get('/competitions/:competitionId/fixtures', (context) => getCompetitionFixturesController.handle(context))
  .get('/fixtures/:id', (context) => getFixtureController.handle(context))
  .post('/fixtures', (context) => createFixtureController.handle(context), createAndUpdateFixtureSchema)
  .put('/fixtures/:id', (context) => updateFixtureController.handle(context), createAndUpdateFixtureSchema);

app.listen(3000);
console.log('Server is running on port 3000');
