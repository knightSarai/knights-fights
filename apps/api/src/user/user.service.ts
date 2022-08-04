import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

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
