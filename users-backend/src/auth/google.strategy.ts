import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from './auth.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private authService: AuthService) {
    super({
        clientID : '509671817245-l0r5fh1vjjn0kgtl03b4jahulej49h82.apps.googleusercontent.com',
        clientSecret : 'nyUb-Z8gS35NuQdF5F0rCF7_',
        callbackURL : 'http://localhost:3000/api/auth/google/callback',
        scope : ['email', 'profile']
    });
  }

  async validate(acccessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const {name, emails, photos} = profile;
    const user = {
        email: emails[0].value,
        name: name.givenName + " " + name.familyName,
    }
    
    done(null, user);

    return true;
  }
}