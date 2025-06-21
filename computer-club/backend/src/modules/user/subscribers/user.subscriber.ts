import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { RemoveEvent } from 'typeorm/subscriber/event/RemoveEvent';
import { User } from '../user';
import { Review } from '../../review/review';
import { Booking } from '../../booking/booking';
import { Order } from '../../order/order';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  async beforeRemove(event: RemoveEvent<User>) {
    await event.manager.transaction(async (manager: EntityManager) => {
      await manager.delete(Review, { user: event.entity });
      await manager.delete(Booking, { user: event.entity });
      await manager.delete(Order, { user: event.entity });
    });
  }
}
