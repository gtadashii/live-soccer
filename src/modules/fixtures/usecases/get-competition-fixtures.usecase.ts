import type { IFixturesRepository } from '../../../repositories/fixtures.repository';
import type { Fixture } from '../../fixtureEvents/fixture.model';

export class GetCompetitionFixturesUseCase {
  constructor(private fixturesRepository: IFixturesRepository) {}

  public async execute(competitionId: string): Promise<Fixture[] | []> {
    const fixtures = await this.fixturesRepository.getFixturesByCompetitionId(competitionId);
    return fixtures;
  }
}
