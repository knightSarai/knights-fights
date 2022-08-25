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

  create(username: string, email: string, password: string) {
    const user = this.repo.create({username, email, password });
    return this.repo.save(user);
  }

  findOne(id: number) {
    if (!id) {
      return null;
    }
    return this.repo.findOneBy({id});
  }

  find(attr: Partial<User>) {
    return this.repo.findOneBy(attr);
  }
}
