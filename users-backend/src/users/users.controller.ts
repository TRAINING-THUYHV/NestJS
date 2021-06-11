import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { LoginGuard } from 'src/auth/login.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService){}
    
    @Get()
    @UseGuards(LoginGuard)
    async getAllUsers() {
        return await this.usersService.findAll();
    }

    @Get(':id')
    async getById(@Param('id') id: string) {
        return await this.usersService.findOne(id);
    }

    @Post()
    async create(@Body() user: User) {
        return await this.usersService.create(user);
    }

    @Put()
    async update(@Body() user: User) {
        return await this.usersService.update(user);
    }

    @Delete(':id')
    async delete(@Param() params) {
        return await this.usersService.update(params.id);
    }
}
