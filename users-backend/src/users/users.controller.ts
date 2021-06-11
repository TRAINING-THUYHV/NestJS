import { Controller, Get, UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/auth/login.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    
    @Get()
    @UseGuards(LoginGuard)
    async getAllUsers() {
        return await this.usersService.findAll();
    }
}
