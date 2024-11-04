import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAdminGuard extends AuthGuard('jwt') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const canActivate = await super.canActivate(context) as boolean;

        const user = request.user;
        if (!canActivate || !user) {
            throw new UnauthorizedException('User not authorized or token is invalid');
        }


        if (user.level > 3) {
            return true; 
        }

        throw new UnauthorizedException('User is not an admin'); 
    }
}
