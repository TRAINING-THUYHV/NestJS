import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, UseGuards } from '@nestjs/common';
import { Role } from '../common/role.enum';
import { LoginGuard } from '../auth/login.guard';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('users')
@UseGuards(LoginGuard)
@UseGuards(RolesGuard)
export class UsersController {
    constructor(private usersService: UsersService){}
    
    @Get()
    async getAllUsers() {
        let users = await this.usersService.findAll();
        users.forEach((user) => { delete(user.password) });
        return users;
    }

    @Get(':id')
    @Roles(Role.Admin, Role.User)
    async getById(@Param('id', ParseIntPipe) id: number) {
        const user = await this.usersService.findOne(id);
        delete(user.password);
        return user;
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
