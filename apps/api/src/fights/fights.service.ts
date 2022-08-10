import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';
import { CreateFightDto } from './dtos/create-fight.dto';
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
}
