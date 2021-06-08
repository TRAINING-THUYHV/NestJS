import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findOne(email: string): Promise<User> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }
}
