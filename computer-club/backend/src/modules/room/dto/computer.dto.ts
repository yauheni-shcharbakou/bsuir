import { ApiProperty } from '@nestjs/swagger';

export class ComputerDto {
  @ApiProperty() readonly type: number;
  @ApiProperty() readonly code: number;
}
