import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { RemoveEvent } from 'typeorm/subscriber/event/RemoveEvent';
import { Room } from '../entities/room';
import { Review } from '../../review/review';
import { Computer } from '../entities/computer';

@EventSubscriber()
export class RoomSubscriber implements EntitySubscriberInterface<Room> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Room;
  }

  async beforeRemove(event: RemoveEvent<Room>) {
    await event.manager.transaction(async (manager: EntityManager) => {
      await manager.delete(Review, { room: event.entity });
      await manager.delete(Computer, { room: event.entity });
    });
  }
}
