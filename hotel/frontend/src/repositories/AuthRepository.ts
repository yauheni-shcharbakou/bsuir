import jwtDecode from 'jwt-decode';
import BaseRepository from '../core/BaseRepository';
import { AuthModel, TokenModel } from '../abstractions/models';
import { APIRoute, StorageKey } from '../constants/enums';
import { Repository } from '../shared/decorators';

@Repository(APIRoute.AUTH)
export default class AuthRepository extends BaseRepository {
  private static saveToken(token: string) {
    localStorage.setItem(StorageKey.TOKEN, token);
  }

  async auth(): Promise<TokenModel> {
    const { token } = (await this.authApi.get<AuthModel>(this.route)).data;
    AuthRepository.saveToken(token);
    return jwtDecode(token);
  }

  async register(email: string, password: string): Promise<TokenModel> {
    const { token } = (
      await this.api.post<AuthModel>(`${this.route}/register`, { email, password })
    ).data;

    AuthRepository.saveToken(token);
    return jwtDecode(token);
  }

  async login(email: string, password: string): Promise<TokenModel> {
    const { token } = (await this.api.post<AuthModel>(`${this.route}/login`, { email, password }))
      .data;

    AuthRepository.saveToken(token);
    return jwtDecode(token);
  }
}
