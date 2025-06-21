import { Repository, Singleton } from '../shared/decorators';
import { MinimalRepository } from './shared/minimal.repository';
import { Event } from '../abstractions/models';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.EVENTS)
export class EventRepository extends MinimalRepository<Event> {
  async getByUser(): Promise<Event[]> {
    return (await this.authInstance.get<Event[]>(`${this.subRoute}/by-user`)).data;
  }

  async create(dto: Partial<Event>): Promise<Event> {
    return (await this.authInstance.post<Event>(this.subRoute, dto)).data;
  }

  async updateSeenBy(id: number) {
    await this.authInstance.patch<Event>(`${this.subRoute}/${id}/seen-by`);
  }

  async updateInfo(id: number, dto: Partial<Event>): Promise<Event> {
    return (await this.authInstance.patch<Event>(`${this.subRoute}/${id}/info`, dto)).data;
  }
}
