import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoginGuard } from './login.guard';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: 'secret',
      signOptions: {expiresIn: '1d'},
    }),
  ],
  providers: [AuthService, LoginGuard],
  controllers: [AuthController],
  exports: [
    LoginGuard,
    JwtModule
  ]
})
export class AuthModule {}
