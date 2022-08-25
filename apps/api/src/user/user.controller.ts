import { Body, Session, Controller, Post, Get, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from '../app/interceptors/serialize.interceptor';

import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';
import { User } from './user.entity';
import { CurrentUser } from './decorators/user.decorator';
import { PrismaService } from '@knights-fights/prisma'


@Controller('auth')
@Serialize<UserDto>(UserDto)
export class UserController {
  constructor(private prisma: PrismaService, private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() user: CreateUserDto, @Session() session: any) {
    const newUser =  await this.authService.signUp(user.username, user.password, user.email);
    session.userId = newUser.id;
    return newUser;
  }


  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    console.log(this.prisma)
    const user =  await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.userId = null;
  }

  @Get('/me')
  async me(@CurrentUser() user: User) {
    if (!user) {
      throw new NotFoundException('No logged in user');
    }
    return user
  }
}
