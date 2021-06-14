import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';
import { CaslAbilityFactory } from './casl-ability.factory';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule,],
  providers: [AuthService, LocalStrategy, CaslAbilityFactory],
})
export class AuthModule {}
