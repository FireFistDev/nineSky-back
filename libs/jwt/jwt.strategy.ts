import { UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey:  process.env.JWT_SECRET
        });
    }

    async validate(payload: userPaylaod) {
        // Remove iat and exp fields from the payload
        const { iat, exp, ...filteredPayload } = payload;

        // Additional checks can go here if necessary
        if (!filteredPayload) {
            throw new UnauthorizedException("Invalid token payload.");
        }

        return filteredPayload;
    }
}