import { Module } from '@nestjs/common';
import { SuperuserService } from './superuser.service';
import { PrismaModule, PrismaService } from '@knights-fights/prisma';


@Module({
  controllers: [PrismaModule],
  providers: [
    SuperuserService,
    PrismaService,
  ],

  exports: [SuperuserService],
})
export class SuperuserModule {}
