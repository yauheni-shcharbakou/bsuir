import { BaseRepository } from './shared/base.repository';
import { Repository, Singleton } from '../shared/decorators';
import { HealthCheckDto } from '../abstractions/dto';

@Singleton()
@Repository()
export class MainRepository extends BaseRepository {
  async healthCheck(): Promise<boolean> {
    const { data } = await this.instance.get<HealthCheckDto>(`${this.subRoute}/test`);
    return data.status === 'ok';
  }
}
