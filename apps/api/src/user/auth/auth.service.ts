import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';


@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(username: string, password: string, email: string) {
    const userExist = await this.userService.find({email: email})

    if (userExist) {
      throw new BadRequestException('Email already exist')
    }
    return this.userService.create(username, email, password);
  }
}
