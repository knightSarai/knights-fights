import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { AuthGuard } from '../app/guards/auth.guard';
import { Serialize } from '../app/interceptors/serialize.interceptor';
import { CurrentUser } from '../user/decorators/user.decorator';
import { User } from '../user/user.entity';
import { CreateFightDto } from './dtos/create-fight.dto';
import { FightDto } from './dtos/fight.dto';
import { FightsService } from './fights.service';


@Controller('fights')
export class FightsController {
  constructor(private fightsService: FightsService) {}
  
  @Post()
  @UseGuards(AuthGuard)
  @Serialize(FightDto)
  createFight(@Body() fight: CreateFightDto, @CurrentUser() user: User) {
    return this.fightsService.create(fight, user);
  }
}
