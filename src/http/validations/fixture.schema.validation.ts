import { t } from 'elysia';

export const createAndUpdateFixtureSchema = {
  body: t.Object({
    competitionId: t.String(),
    homeTeamId: t.String(),
    awayTeamId: t.String(),
  }),
};
