 

import { Injectable, CanActivate, ExecutionContext, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const canActivate = await super.canActivate(context) as boolean;

    const user = request.user;
    if (!canActivate || !user) {
        throw new UnauthorizedException('User not authorized or token is invalid');
    }
        return true; 
  
}
}
