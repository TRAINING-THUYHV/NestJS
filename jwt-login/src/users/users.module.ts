import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { RoleGuard } from 'src/auth/role.guard';
import { CaslAbilityFactory } from 'src/auth/casl-ability.factory';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
    ],
    providers: [UsersService, RoleGuard, CaslAbilityFactory],
    exports: [UsersService],
    controllers: [UsersController],
})
export class UsersModule {}
