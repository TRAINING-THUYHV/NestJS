import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepo: Repository<User>
    ) {}

    async findAll(){
        return await this.userRepo.find();
    }

    async findOne(id) {
        return await this.userRepo.findOne(id);
    }

    async create (user : User) : Promise<User> {
        return await this.userRepo.save(user);
    }

    async update (user : User) : Promise<UpdateResult> {
        return await this.userRepo.update(user.id, user);
    }

    async delete (id : string) : Promise<DeleteResult> {
        return await this.userRepo.delete(id);
    }
}
