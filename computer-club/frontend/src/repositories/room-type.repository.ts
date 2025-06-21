import { Repository, Singleton } from '../shared/decorators';
import { RoomType } from '../abstractions/models';
import { CrudRepository } from './shared/crud.repository';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.ROOM_TYPES)
export class RoomTypeRepository extends CrudRepository<RoomType, RoomType> {}
