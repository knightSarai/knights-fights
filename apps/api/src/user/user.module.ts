import { MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';
import { AuthService } from './auth/auth.service';
import { CurrentUserMiddleware } from './middlewares/current-user.middleware';
import { PrismaModule, PrismaService } from '@knights-fights/prisma';


@Module({
  imports: [TypeOrmModule.forFeature([User]), PrismaModule],
  controllers: [UserController],
  providers: [
    UserService,
    AuthService,
    PrismaService
  ],
})
export class UserModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CurrentUserMiddleware).forRoutes('*');
  }
}
