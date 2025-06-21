import { Repository, Singleton } from '../shared/decorators';
import { Option } from '../abstractions/models';
import { CrudRepository } from './shared/crud.repository';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.OPTIONS)
export class OptionRepository extends CrudRepository<Option, Option> {}
