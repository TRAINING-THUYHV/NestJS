import { BadRequestException, Body, Controller, Get, Post, Req, Res, UnauthorizedException, UseGuards } from '@nestjs/common';
import { User } from '../users/user.entity';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response, Request } from 'express';
import { LoginGuard } from './login.guard';
import { AuthGuard } from '@nestjs/passport';
import { UsersService } from '../users/users.service';
 
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
    private usersService: UsersService,
    ) {}

  @Post('login')
  async getData(@Body() user: User, @Res({ passthrough: true }) response: Response) {
    const userDB = await this.authService.findOne(user.email);
    // Check exist user  
    if (!userDB) {
      throw new BadRequestException('User not exist!');
    }
    // Compare password
    if (!(await bcrypt.compare(user.password, userDB.password))) {
      throw new BadRequestException('Password incorrect!');
    }

    const jwt = await this.jwtService.sign({email: userDB.email});

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'succsess',
      access_token: jwt
    };
  }

  @Get('gooogle-login')
  @UseGuards(AuthGuard('google'))  
  async gooogleLogin(@Req() req) { }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async gooogleAuthRedirect(@Req() req, @Res({ passthrough: true }) response: Response) {
    // return this.authService.googleLogin(req);
    const user = await req.user;
    const userDB = await this.authService.findOne(user.email);
    // Not exist in db then save new
    if (!userDB) {
      user.typeLogin = "google";
      const save = await this.usersService.create(user);
    }

    const jwt = await this.jwtService.sign({email: user.email});

    response.cookie('jwt', jwt, { httpOnly: true });

    return {
      message: 'succsess',
      access_token: jwt
    };
  }

  @Post('register')
  async register(@Body() user: User) {
    user.password = await bcrypt.hash(user.password, 10);

    const result = await this.authService.create(user);
    delete result.password;

    return result;
  }
  
  @UseGuards(LoginGuard)
  @Get('user')
  async userLogin(@Req() request: Request) {
    try {
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);

      if (!data) {
        throw new UnauthorizedException();
      }

      const userDB = await this.authService.findOne(data['email']);
      delete userDB.password;

      return userDB;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  @UseGuards(LoginGuard)
  @Post('logout')
  async logout(@Res({passthrough: true}) response : Response)  {
    response.clearCookie('jwt');
    return {
      message: 'success'
    };
  }
}
