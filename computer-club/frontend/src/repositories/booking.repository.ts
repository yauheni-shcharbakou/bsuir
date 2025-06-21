import { Repository, Singleton } from '../shared/decorators';
import { BookingPopulated } from '../abstractions/models';
import { EndPoint } from '../constants/enums';
import { BaseRepository } from './shared/base.repository';
import { BookingDto, DeleteDto } from '../abstractions/dto';

@Singleton()
@Repository(EndPoint.BOOKINGS)
export class BookingRepository extends BaseRepository {
  async getByUser(): Promise<BookingPopulated[]> {
    return (await this.authInstance.get<BookingPopulated[]>(this.subRoute)).data;
  }

  async getById(id: number): Promise<BookingPopulated> {
    return (await this.authInstance.get<BookingPopulated>(`${this.subRoute}/${id}`)).data;
  }

  async update(id: number, dto: BookingDto): Promise<BookingPopulated> {
    return (await this.authInstance.put<BookingPopulated>(`${this.subRoute}/${id}`, dto)).data;
  }

  async delete(id: number): Promise<number> {
    return (await this.authInstance.delete<DeleteDto>(`${this.subRoute}/${id}`)).data.id;
  }
}
