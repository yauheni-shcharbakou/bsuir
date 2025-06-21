import { Booking, BookingListModel, BookingPopulated } from '../abstractions/models';
import { APIRoute } from '../constants/enums';
import { Repository } from '../shared/decorators';
import CrudRepository from '../core/CrudRepository';

@Repository(APIRoute.BOOKINGS)
export default class BookingRepository extends CrudRepository<BookingPopulated, Booking> {
  async getByUser(userId: number): Promise<BookingListModel> {
    return (await this.api.get<BookingListModel>(`${this.route}?userId=${userId}`)).data;
  }
}
