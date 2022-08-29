import { Module } from '@nestjs/common';
import { CreateSuperuser } from './createsuperuser.command';
import { PrismaModule, PrismaService } from '@knights-fights/prisma';
import { SuperuserService, SuperuserModule } from '@knights-fights/superuser';


@Module({
  imports: [PrismaModule, SuperuserModule],
  providers: [
    PrismaService,
    CreateSuperuser,
    SuperuserService,
  ],
})
export class AppModule {}
