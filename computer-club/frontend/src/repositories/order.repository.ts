import { Repository, Singleton } from '../shared/decorators';
import { MinimalRepository } from './shared/minimal.repository';
import { OrderPopulated } from '../abstractions/models';
import { OrderDto } from '../abstractions/dto';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.ORDERS)
export class OrderRepository extends MinimalRepository<OrderPopulated> {
  async create(dto: OrderDto): Promise<OrderPopulated> {
    return (await this.authInstance.post<OrderPopulated>(this.subRoute, dto)).data;
  }
}
