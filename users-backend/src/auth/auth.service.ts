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

  async findOne(email: any): Promise<User> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return await this.userRepo.save(user);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userRepo.findOne(username);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
