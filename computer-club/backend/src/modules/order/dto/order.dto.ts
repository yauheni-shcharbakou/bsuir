import { ApiProperty } from '@nestjs/swagger';

export class OrderDto {
  @ApiProperty() readonly option: number;
  @ApiProperty() readonly amount: number;
}
