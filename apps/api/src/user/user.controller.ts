import { Body, Session, Controller, Param, Post, Get, NotFoundException, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from './interceptors/serialize.interceptor'
import { UserService } from './user.service';

import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth/auth.service';

@Controller('auth')
@Serialize<UserDto>(UserDto)
export class UserController {
  constructor(private userService: UserService, private authService: AuthService) {}
  @Post('/signup')
  async signUp(@Body() user: CreateUserDto, @Session() session: any) {
    const newUser =  await this.authService.signUp(user.username, user.password, user.email);
    session.user = newUser.id;
    return newUser;
  }


  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user =  await this.authService.signIn(body.email, body.password);
    session.user = user.id;
    return user;
  }

  @Post('/signout')
  async signOut(@Session() session: any) {
    session.user = null;
  }

  @Get('/me')
  async me(@Session() session: any) {
    if (!session.user) {
      throw new NotFoundException('User not found');
    }
    return this.userService.findOne(session.user);
  }

}
