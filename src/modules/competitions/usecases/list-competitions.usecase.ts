import type { ICompetitionsRepository } from '../../../repositories/competitions.repository';
import type { Competition } from '../competition.model';

export class ListCompetitionsUseCase {
  constructor(private competitionsRepository: ICompetitionsRepository) {}

  public async execute(): Promise<Competition[]> {
    const competitions = await this.competitionsRepository.listCompetitions();

    return competitions;
  }
}
