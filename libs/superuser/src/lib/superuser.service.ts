import { Injectable } from '@nestjs/common';
import { PrismaService } from '@knights-fights/prisma';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';


const scrypt = promisify(_scrypt);

@Injectable()
export class SuperuserService {
  constructor(private prisma: PrismaService) {}

  async create(username: string, password: string, email: string) {

    const salt = randomBytes(8).toString('hex');

    const hashedPassword = (await scrypt(password, salt, 32)) as Buffer;
    const hashedAndSaltedPassword = salt + '.' + hashedPassword.toString('hex');

    const foundUser = await this.prisma.user.findUnique({where: {email}});

    if (foundUser) {
      throw new Error('Email already exists');
    }

    return await this.prisma.user.create({
      data: {
        username,
        email,
        password:hashedAndSaltedPassword,
        admin: true
      }
    });
  }
}
