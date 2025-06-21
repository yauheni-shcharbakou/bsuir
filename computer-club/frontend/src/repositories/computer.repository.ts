import { BaseRepository } from './shared/base.repository';
import { Repository, Singleton } from '../shared/decorators';
import { BookingPopulated, ComputerPopulated } from '../abstractions/models';
import { BookingDto, DeleteDto } from '../abstractions/dto';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.COMPUTERS)
export class ComputerRepository extends BaseRepository {
  async getById(id: number): Promise<ComputerPopulated> {
    return (await this.authInstance.get<ComputerPopulated>(`${this.subRoute}/${id}`)).data;
  }

  async getComputerBookings(id: number): Promise<BookingPopulated[]> {
    return (await this.authInstance.get<BookingPopulated[]>(`${this.subRoute}/${id}/bookings`)).data;
  }

  async createComputerBooking(id: number, dto: BookingDto): Promise<BookingPopulated> {
    return (await this.authInstance.post<BookingPopulated>(`${this.subRoute}/${id}/bookings`, dto)).data;
  }

  async updateRoom(id: number, room: number): Promise<ComputerPopulated> {
    return (await this.authInstance.patch<ComputerPopulated>(`${this.subRoute}/${id}/room`, { room })).data;
  }

  async updateType(id: number, type: number): Promise<ComputerPopulated> {
    return (await this.authInstance.patch<ComputerPopulated>(`${this.subRoute}/${id}/type`, { type })).data;
  }

  async updateCode(id: number, code: number): Promise<ComputerPopulated> {
    return (await this.authInstance.patch<ComputerPopulated>(`${this.subRoute}/${id}/code`, { code })).data;
  }

  async delete(id: number): Promise<number> {
    return (await this.authInstance.delete<DeleteDto>(`${this.subRoute}/${id}`)).data.id;
  }
}
