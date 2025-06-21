import { ApiProperty } from '@nestjs/swagger';

export class ComputerTypeDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly ram: string;
  @ApiProperty() readonly cpu: string;
  @ApiProperty() readonly gpu: string;
}
