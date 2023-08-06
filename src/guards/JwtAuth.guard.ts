import { CanActivate, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { log } from "console";
import { Observable } from "rxjs";

export class JwtAuthGuard implements CanActivate{
    constructor(private readonly jwtService: JwtService) {}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();

        const authorization = req.headers.authorization;

        if ( !authorization ) {
            throw new UnauthorizedException({message: "User is not registered"})
        }

        const [bearer, token] = authorization.split(" ");

        if ( bearer !== "Bearer" || !token ) {
            throw new UnauthorizedException({message: "User is not registered"})
        }

        let user: any;

        try {
            user = this.jwtService.verify(token, {
                secret: process.env.REFRESH_TOKEN_KEY
            });
        } catch (error) {
            console.log(error);
            throw new UnauthorizedException({message: "User is not registered"})
        }
        req.user = user;

        return true;
    }
}