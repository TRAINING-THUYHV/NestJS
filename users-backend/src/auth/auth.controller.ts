import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async getData(@Body() user: User) {
    const userDB = await this.authService.findOne(user.email);
    // Check exist user
    if (!userDB) {
      throw new BadRequestException('User not exist!');
    }
    // Compare password
    if (!(await bcrypt.compare(user.password, userDB.password))) {
      throw new BadRequestException('Password incorrect!');
    }
    return userDB;
  }

  @Post('register')
  async register(@Body() user: User) {
    user.password = await bcrypt.hash(user.password, 10);
    return this.authService.create(user);
  }
}
