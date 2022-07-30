import { Body, Controller, Param, Post, Get, NotFoundException} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { Serialize } from './serialize.interceptor'
import { UserService } from './user.service';

import { UserDto } from './user.dto';
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
}
