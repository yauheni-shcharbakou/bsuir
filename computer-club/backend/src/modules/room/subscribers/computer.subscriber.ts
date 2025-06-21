import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { RemoveEvent } from 'typeorm/subscriber/event/RemoveEvent';
import { Computer } from '../entities/computer';
import { Booking } from '../../booking/booking';

@EventSubscriber()
export class ComputerSubscriber implements EntitySubscriberInterface<Computer> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return Computer;
  }

  async beforeRemove(event: RemoveEvent<Computer>) {
    await event.manager.transaction(async (manager: EntityManager) => {
      await manager.delete(Booking, { computer: event.entity });
    });
  }
}
