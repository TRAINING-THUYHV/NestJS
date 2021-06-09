import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {

  protected jwtService: JwtService

  async use(req: Request, res: Response, next: NextFunction) {
    // try {
     
    // } catch (error) {
    //   console.log("Khong tim duoc 234");
    //   throw new UnauthorizedException();
    // }

    console.log(req);

    const cookie = req.cookies['jwt'];
    // const data = await this.jwtService.verify(cookie);

    // if (!data) {
    //   throw new UnauthorizedException();
    // }

    next();
  }
}
