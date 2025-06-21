import { UserRole } from '../../../constants/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty() readonly email: string;
  @ApiProperty() readonly password: string;
  @ApiProperty() readonly phone: string = '';
  @ApiProperty() readonly nickname: string = '';
  @ApiProperty() readonly role: UserRole = UserRole.CLIENT;
}
