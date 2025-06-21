import { Room, RoomPaginationModel, RoomPopulated } from '../abstractions/models';
import { APIRoute } from '../constants/enums';
import { Repository } from '../shared/decorators';
import { IRoomRequestConfig } from '../abstractions/interfaces';
import { clearObject } from '../shared/common';
import CrudRepository from '../core/CrudRepository';

@Repository(APIRoute.ROOMS)
export default class RoomRepository extends CrudRepository<RoomPopulated, Room> {
  async getAllWithPagination(config: IRoomRequestConfig): Promise<RoomPaginationModel> {
    const cleared = clearObject(config);
    return (await this.api.get<RoomPaginationModel>(`${this.route}/paginated`, { params: cleared }))
      .data;
  }
}
