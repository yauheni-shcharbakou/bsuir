import { UserPopulated } from '../abstractions/models';
import { APIRoute, Role } from '../constants/enums';
import { Repository } from '../shared/decorators';
import MinimalRepository from '../core/MinimalRepository';

@Repository(APIRoute.USERS)
export default class UserRepository extends MinimalRepository<UserPopulated> {
  async changeRole(id: number, role: Role): Promise<UserPopulated> {
    return (await this.authApi.patch<UserPopulated>(`${this.route}/${id}/role`, { role })).data;
  }

  async changeCredentials(id: number, email: string, password: string): Promise<UserPopulated> {
    return (
      await this.authApi.patch<UserPopulated>(`${this.route}/${id}/credentials`, {
        email,
        password,
      })
    ).data;
  }
}
