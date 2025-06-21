import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../../user/user';
import { AuthService } from '../auth.service';
import { jwtConfig } from '../../../configs/jwt.config';

type PartialUser = Pick<User, 'email' | 'role'>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: jwtConfig.verifyOptions.ignoreExpiration,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: PartialUser): Promise<User> {
    return this.authService.checkUser(payload.email, payload.role);
  }
}
