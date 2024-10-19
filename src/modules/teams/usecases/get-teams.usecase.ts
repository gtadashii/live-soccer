import { TeamNotFoundException } from '../../../http/exceptions';
import type { Team } from '../team.model';
import type { ITeamRepository } from '../../../repositories/teams.repository';

export class GetTeamsUseCase {
  constructor(private teamsRepository: ITeamRepository) {}

  public async execute(): Promise<Team[]> {
    const teams = await this.teamsRepository.list();

    if (!teams) {
      throw new TeamNotFoundException('No teams found');
    }

    return teams;
  }
}
