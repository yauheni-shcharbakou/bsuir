import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { RemoveEvent } from 'typeorm/subscriber/event/RemoveEvent';
import { Option } from '../option';
import { Order } from '../../order/order';

@EventSubscriber()
export class OptionSubscriber implements EntitySubscriberInterface<Option> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Option;
  }

  async beforeRemove(event: RemoveEvent<Option>) {
    await event.manager.transaction(async (manager: EntityManager) => {
      await manager.delete(Order, { option: event.entity });
    });
  }
}
