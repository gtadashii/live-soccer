import { TeamNotFoundException } from '../../../http/exceptions';
import type { ITeamRepository } from '../../../repositories/teams.repository';
import type { Team } from '../team.model';

export class GetTeamByIdUseCase {
  constructor(private teamsRepository: ITeamRepository) {}

  public async execute(teamId: string): Promise<Team> {
    const team = await this.teamsRepository.find(teamId);

    if (!team) {
      throw new TeamNotFoundException('Team not found');
    }

    return team;
  }
}
