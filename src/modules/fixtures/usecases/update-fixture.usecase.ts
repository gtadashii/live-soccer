import { FixtureNotFoundException } from '../../../http/exceptions';
import type { IFixturesRepository } from '../../../repositories/fixtures.repository';
import type { Fixture } from '../../fixtureEvents/fixture.model';

export class UpdateFixtureUsecase {
  constructor(private fixturesRepository: IFixturesRepository) {}

  public async execute(fixtureId: string, fixture: Fixture): Promise<Fixture | null> {
    const currentFixture = await this.fixturesRepository.getFixtureById(fixtureId);

    if (!currentFixture) {
      throw new FixtureNotFoundException('No fixture found with the provided id');
    }

    const updatedFixture = await this.fixturesRepository.updateFixture(fixtureId, fixture);
    return updatedFixture;
  }
}
