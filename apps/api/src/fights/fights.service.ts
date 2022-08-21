import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateFightDto } from './dtos/create-fight.dto';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { Fight } from './fight.entity';

@Injectable()
export class FightsService {
  constructor(@InjectRepository(Fight) private repo: Repository<Fight>) {}

  create(fightDto: CreateFightDto, user: User) {
    const fight = this.repo.create(fightDto);
    fight.user = user;
    return this.repo.save(fight);
  }
  
  async changeApproval(id: string, approved: boolean) {
    const fight = await this.repo.findOneBy({id});

    if (!fight) {
      throw new NotFoundException('Fight not found');
    }

    fight.approved = approved;
    return this.repo.save(fight);
  }

  getEstimate({rounds, age, wins, losses, draws}: GetEstimateDto) {
    //Estimate Process
    /* Find fights for the same rounds */
    /* Age is between 3  years */
    /* order by closest record */
    /* wins losses draws 
    * order by wins from  highest to lowest
    * losess from lowest to highest
    * draws from lowest to highest
    * */

    return this.repo.createQueryBuilder()
      .select('ROUND(AVG(price)) ', 'price')
      .where('rounds = :rounds', { rounds })
      .andWhere('age - :age BETWEEN -3 AND 3', { age })
      .andWhere('approved IS TRUE')
      .orderBy({
        'ABS(wins - :wins)': 'ASC',
        'ABS(losses - :losses)': 'DESC',
        'ABS(draws - :draws)': 'DESC',
      })
      .setParameters({ wins, losses, draws })
      .limit(3)
      .getRawOne();
  }
}
