import { Building } from '../abstractions/models';
import { APIRoute } from '../constants/enums';
import { Repository } from '../shared/decorators';
import CrudRepository from '../core/CrudRepository';

@Repository(APIRoute.BUILDINGS)
export default class BuildingRepository extends CrudRepository<Building, Building> {}
