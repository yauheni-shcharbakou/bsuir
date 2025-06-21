import { ApiProperty } from '@nestjs/swagger';

export class BookingDto {
  @ApiProperty() readonly date: string;
  @ApiProperty() readonly hours: number;
}
