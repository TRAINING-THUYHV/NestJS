import { Controller, Get, UseGuards } from '@nestjs/common';
import { RoleGuard } from 'src/auth/role.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}

    @Get()
    @UseGuards(RoleGuard)
    // READ
    async getUsers () {
        return await this.usersService.findAll();
    }
}
