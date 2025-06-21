import { ApiProperty } from '@nestjs/swagger';

export class RoomTypeDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly places: number;
  @ApiProperty() readonly price: number;
}
