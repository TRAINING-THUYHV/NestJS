import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(user : User): Promise<any> {
    console.log(user);
    // const user = await this.authService.validateUser(email, password);

    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    return 123;
  }
}