import { JWT_SECRET } from '../constants/common';
import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  secret: JWT_SECRET,
  signOptions: {
    expiresIn: '6h',
  },
  verifyOptions: {
    ignoreExpiration: false,
  },
};
