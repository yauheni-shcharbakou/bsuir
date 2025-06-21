import { ApiProperty } from '@nestjs/swagger';

export class EventDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly date: string;
}
