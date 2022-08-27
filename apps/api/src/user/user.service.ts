import { Injectable } from '@nestjs/common';
import { PrismaService } from '@knights-fights/prisma'
import { user as PrismaUser, Prisma} from '@prisma/client'

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  user(
    userWhereUniqueInput: Prisma.userWhereUniqueInput,
  ): Promise<PrismaUser | null> {
    return this.prisma.user.findUnique({where: userWhereUniqueInput});
  }

  create(data: Prisma.userCreateInput) {
    return this.prisma.user.create({data});
  }
}
