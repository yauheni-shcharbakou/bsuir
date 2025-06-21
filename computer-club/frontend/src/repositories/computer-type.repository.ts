import { Repository, Singleton } from '../shared/decorators';
import { ComputerType } from '../abstractions/models';
import { CrudRepository } from './shared/crud.repository';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.COMPUTER_TYPES)
export class ComputerTypeRepository extends CrudRepository<ComputerType, ComputerType> {}
