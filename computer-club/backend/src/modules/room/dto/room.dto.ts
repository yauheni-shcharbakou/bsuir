import { ApiProperty } from '@nestjs/swagger';

export class RoomDto {
  @ApiProperty() readonly type: number;
  @ApiProperty() readonly name: string;
}
