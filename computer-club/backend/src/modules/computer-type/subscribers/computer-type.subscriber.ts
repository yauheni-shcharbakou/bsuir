import { DataSource, EntityManager, EntitySubscriberInterface, EventSubscriber } from 'typeorm';
import { RemoveEvent } from 'typeorm/subscriber/event/RemoveEvent';
import { ComputerType } from '../computer-type';
import { Computer } from '../../room/entities/computer';

@EventSubscriber()
export class ComputerTypeSubscriber implements EntitySubscriberInterface<ComputerType> {
  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return ComputerType;
  }

  async beforeRemove(event: RemoveEvent<ComputerType>) {
    await event.manager.transaction(async (manager: EntityManager) => {
      await manager.delete(Computer, { type: event.entity });
    });
  }
}
