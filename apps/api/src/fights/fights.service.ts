import { Injectable } from '@nestjs/common';
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
}
