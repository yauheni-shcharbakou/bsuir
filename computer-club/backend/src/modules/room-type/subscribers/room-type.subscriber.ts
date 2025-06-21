import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { RoomType } from '../room-type';
import { RemoveEvent } from 'typeorm/subscriber/event/RemoveEvent';
import { Room } from '../../room/entities/room';

@EventSubscriber()
export class RoomTypeSubscriber implements EntitySubscriberInterface<RoomType> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return RoomType;
  }

  async beforeRemove(event: RemoveEvent<RoomType>) {
    await event.manager.transaction(async (manager: EntityManager) => {
      await manager.delete(Room, { type: event.entity });
    });
  }
}
