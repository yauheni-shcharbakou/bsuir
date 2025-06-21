import { Repository, Singleton } from '../shared/decorators';
import { MinimalRepository } from './shared/minimal.repository';
import { User } from '../abstractions/models';
import { EndPoint, UserRole } from '../constants/enums';

@Singleton()
@Repository(EndPoint.USERS)
export class UserRepository extends MinimalRepository<User> {
  async updateRole(id: number, role: UserRole): Promise<User> {
    return (await this.authInstance.patch<User>(`${this.subRoute}/${id}/role`, { role })).data;
  }

  async updateInfo(id: number, dto: Partial<User>): Promise<User> {
    return (await this.authInstance.patch<User>(`${this.subRoute}/${id}/info`, dto)).data;
  }
}
