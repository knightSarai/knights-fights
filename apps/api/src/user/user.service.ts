import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { PrismaService } from '@knights-fights/prisma'
import { user as PrismaUser, Prisma} from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService, @InjectRepository(User) private repo: Repository<User>) {}

  user(
    userWhereUniqueInput: Prisma.userWhereUniqueInput,
  ): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({where: userWhereUniqueInput});
  }

  create(data: Prisma.userCreateInput) {
    return this.prisma.user.create({data});
  }
}
