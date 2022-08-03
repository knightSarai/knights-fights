import { Body, Controller, Param, Post, Get, NotFoundException, BadRequestException } from '@nestjs/common';
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
  async createUser(@Body() user: CreateUserDto) {
    return await this.authService.signUp(user.username, user.password, user.email);
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.userService.findOne(parseInt((id)));
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  @Post('/signin')
  async signIn(@Body() user: CreateUserDto) {
    return await this.authService.signIn(user.email, user.password);
  }

}
