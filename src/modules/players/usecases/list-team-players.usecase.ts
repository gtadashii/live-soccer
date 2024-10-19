import { TeamNotFoundException } from '../../../http/exceptions';
import type { IPlayerRepository } from '../../../repositories/players.repository';
import type { ITeamRepository } from '../../../repositories/teams.repository';
import type { Player } from '../player.model';

export class ListTeamPlayersUseCase {
  constructor(
    private teamsRepository: ITeamRepository,
    private playersRepository: IPlayerRepository,
  ) {}

  public async execute(teamId: string): Promise<Player[]> {
    const team = await this.teamsRepository.find(teamId);

    if (!team) {
      throw new TeamNotFoundException('Team not found');
    }

    const players = await this.playersRepository.listByTeamId(teamId);

    return players;
  }
}
