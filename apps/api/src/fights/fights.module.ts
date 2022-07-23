import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';
import { Fight } from './fight.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fight])],
  providers: [FightsService],
  controllers: [FightsController],
})
export class FightsModule {}
