import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy';
import { UsersService } from 'src/users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'},
    }),
  ],
  providers: [AuthService, GoogleStrategy, UsersService],
  controllers: [AuthController],
  exports: [
    JwtModule,
    AuthService
  ]
})
export class AuthModule {}
