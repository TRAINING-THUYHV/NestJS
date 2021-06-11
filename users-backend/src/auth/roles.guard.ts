import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../common/role.enum';
import { AuthService } from './auth.service';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector, 
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // All roles pass
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const cookie = request.cookies['jwt'];
    const loginInfo = await this.jwtService.verifyAsync(cookie);

    const user = await this.authService.findOne(loginInfo.email);

    return requiredRoles.some((role) => user.role?.includes(role));
  }
}