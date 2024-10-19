import { FixtureNotFoundException } from '../../../http/exceptions';
import type { IFixturesRepository } from '../../../repositories/fixtures.repository';
import type { Fixture } from '../../fixtureEvents/fixture.model';

export class GetFixtureUseCase {
  constructor(private fixturesRepository: IFixturesRepository) {}

  public async execute(fixtureId: string): Promise<Fixture> {
    const fixture = await this.fixturesRepository.getFixtureById(fixtureId);

    if (!fixture) {
      throw new FixtureNotFoundException('Fixture not found');
    }

    return fixture;
  }
}
