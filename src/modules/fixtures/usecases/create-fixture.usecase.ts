import { CompetitionNotFoundException } from '../../../http/exceptions';
import type { ICompetitionsRepository } from '../../../repositories/competitions.repository';
import type { IFixturesRepository } from '../../../repositories/fixtures.repository';
import type { Fixture } from '../../fixtureEvents/fixture.model';

export class CreateFixtureUseCase {
  constructor(
    private fixturesRepository: IFixturesRepository,
    private competitionsRepository: ICompetitionsRepository,
  ) {}

  public async execute(competitionId: string, fixture: Fixture): Promise<Fixture> {
    const competition = await this.competitionsRepository.getCompetitionById(competitionId);

    if (!competition) {
      throw new CompetitionNotFoundException('Competition not found');
    }

    const createdFixture = await this.fixturesRepository.createFixture(fixture);

    return createdFixture;
  }
}
