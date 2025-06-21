import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import * as bcrypt from 'bcrypt';
import { ErrorMessage, UserRole } from '../../constants/enums';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from '../../shared/errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

  async login(email: string, password: string): Promise<User> {
    const user: User = await this.userService.getByEmail(email);

    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedError(ErrorMessage.INVALID_PASSWORD);
    }

    return user;
  }

  async checkUser(email: string, role: UserRole): Promise<User> {
    const user: User = await this.userService.getByEmail(email);

    if (!(user.role === role)) {
      throw new UnauthorizedError();
    }

    return user;
  }

  generateToken(user: User): string {
    const { email, role, id } = user;
    return this.jwtService.sign({ email, role, id });
  }
}
