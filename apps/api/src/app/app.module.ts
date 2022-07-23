import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsModule } from '../fights/fights.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity'
import { Fight } from '../fights/fight.entity'

import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [User, Fight],
      synchronize: true,
    }),
    FightsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
