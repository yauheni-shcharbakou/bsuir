import { ApiProperty } from '@nestjs/swagger';

export class OptionDto {
  @ApiProperty() readonly name: string;
  @ApiProperty() readonly description: string;
  @ApiProperty() readonly price: number;
}
