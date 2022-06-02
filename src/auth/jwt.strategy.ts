import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {InjectRepository} from "@nestjs/typeorm";
import {UsersRepository} from "./users.repository";
import {User} from "./user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private userRepository: UsersRepository
    ) {
        super({
            secretOrKey: 'topSecrete98',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: { username: string }): Promise<User> {
        const {username} = payload;
        const user: User = await this.userRepository.findOne({username})

        if (!user) {
            throw new UnauthorizedException()
        }

        return user;
    }
}