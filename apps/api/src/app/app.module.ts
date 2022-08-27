import { MiddlewareConsumer, Module, ValidationPipe  } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { FightsModule } from '../fights/fights.module';
import { UserModule } from '../user/user.module';
import { PrismaModule, PrismaService } from '@knights-fights/prisma';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const  cookieSession = require('cookie-session');


@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    FightsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true
      })
    }
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(
      cookieSession({
        keys: ['knight']
      })
    ).forRoutes('*');
  }
}
