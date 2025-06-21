import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserInfoDto {
  @ApiProperty() readonly email?: string;
  @ApiProperty() readonly password?: string;
  @ApiProperty() readonly phone?: string;
  @ApiProperty() readonly nickname?: string;
}
