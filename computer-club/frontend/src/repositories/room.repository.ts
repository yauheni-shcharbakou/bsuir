import { CrudRepository } from './shared/crud.repository';
import { ComputerPopulated, ReviewPopulated, RoomPopulated } from '../abstractions/models';
import { ComputerDto, RoomDto } from '../abstractions/dto';
import { Repository, Singleton } from '../shared/decorators';
import { EndPoint } from '../constants/enums';

@Singleton()
@Repository(EndPoint.ROOMS)
export class RoomRepository extends CrudRepository<RoomPopulated, RoomDto> {
  async getRoomComputers(roomId: number): Promise<ComputerPopulated[]> {
    return (await this.authInstance.get<ComputerPopulated[]>(`${this.subRoute}/${roomId}/computers`)).data;
  }

  async getRoomReviews(roomId: number): Promise<ReviewPopulated[]> {
    return (await this.authInstance.get<ReviewPopulated[]>(`${this.subRoute}/${roomId}/reviews`)).data;
  }

  async createRoomComputer(roomId: number, dto: ComputerDto): Promise<ComputerPopulated> {
    return (await this.authInstance.post<ComputerPopulated>(`${this.subRoute}/${roomId}/computers`, dto)).data;
  }

  async createRoomReview(roomId: number, text: string): Promise<ReviewPopulated> {
    return (await this.authInstance.post<ReviewPopulated>(`${this.subRoute}/${roomId}/reviews`, { text })).data;
  }
}
