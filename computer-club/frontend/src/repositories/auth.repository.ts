import { BaseRepository } from './shared/base.repository';
import { Repository, Singleton } from '../shared/decorators';
import jwtDecode from 'jwt-decode';
import { AuthDto } from '../abstractions/dto';
import { EndPoint, StorageKey } from '../constants/enums';
import { User } from '../abstractions/models';

@Singleton()
@Repository(EndPoint.AUTH)
export class AuthRepository extends BaseRepository {
  private static convertTokenToUser(token: string): User {
    localStorage.setItem(StorageKey.TOKEN, token);
    const user: User = jwtDecode(token);
    localStorage.setItem(StorageKey.USER_ID, user.id.toString());
    return user;
  }

  async updateToken(): Promise<User> {
    const { data } = await this.authInstance.get<AuthDto>(`${this.subRoute}/refresh`);
    return AuthRepository.convertTokenToUser(data.token);
  }

  async login(email: string, password: string): Promise<User> {
    const { data } = await this.instance.post<AuthDto>(`${this.subRoute}/login`, { email, password });
    return AuthRepository.convertTokenToUser(data.token);
  }

  async register(user: Partial<User>): Promise<User> {
    const { data } = await this.instance.post<AuthDto>(`${this.subRoute}/register`, user);
    return AuthRepository.convertTokenToUser(data.token);
  }
}
