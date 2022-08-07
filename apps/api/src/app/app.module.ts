import { MiddlewareConsumer, Module, ValidationPipe  } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FightsModule } from '../fights/fights.module';
import { UserModule } from '../user/user.module';
import { User } from '../user/user.entity'
import { Fight } from '../fights/fight.entity'

import { AppController } from './app.controller';
import { AppService } from './app.service';

const  cookieSession = require('cookie-session');


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'sqlite',
        database: config.get<string>('DB_NAME'),
        entities: [User, Fight],
        synchronize: true,
      }),
    }),
    FightsModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
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
