import { Option } from '../abstractions/models';
import { APIRoute } from '../constants/enums';
import { Repository } from '../shared/decorators';
import CrudRepository from '../core/CrudRepository';

@Repository(APIRoute.OPTIONS)
export default class OptionRepository extends CrudRepository<Option, Option> {}
