import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from '../user.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private userService: UserService) {}

  async signUp(username: string, password: string, email: string) {
    const userExist = await this.userService.find({email: email})

    if (userExist) {
      throw new BadRequestException('Email already exist')
    }

    const salt = randomBytes(8).toString('hex');
    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
    const hashedAndSaltedPassword = salt + '.' + hashedPassword.toString('hex');


    return this.userService.create(username, email, hashedAndSaltedPassword);
  }

  async signIn(email: string, password: string) {
    const user = await this.userService.find({email});

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const [salt, storedHash] = user.password.split('.');

    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash !== hashedPassword.toString('hex')) {
      throw new BadRequestException('Invalid credentials');
    }
      return user;

  }
}
