import { Module } from '@nestjs/common';
import { FightsService } from './fights.service';
import { FightsController } from './fights.controller';
import { PrismaService } from '@knights-fights/prisma';

@Module({
  imports:[],
  providers: [FightsService, PrismaService],
  controllers: [FightsController],
})
export class FightsModule {}
