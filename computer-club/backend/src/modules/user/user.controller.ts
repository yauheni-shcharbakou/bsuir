import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../constants/enums';
import { UserService } from './user.service';
import { User } from './user';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { Roles } from '../auth/decorators/roles.decorator';
import { UpdateUserInfoDto } from './dto/update-user-info.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.USER)
@Controller(EndPoint.USERS)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: HandlerSummary.USER_GET_ALL })
  @ApiResponse({ type: [User] })
  @Roles(UserRole.ADMIN)
  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.getAll();
  }

  @ApiOperation({ summary: HandlerSummary.USER_GET_BY_ID })
  @ApiResponse({ type: User })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.USER_UPDATE_ROLE })
  @ApiResponse({ type: User })
  @Roles(UserRole.ADMIN)
  @Patch(':id/role')
  async updateRole(@Param('id', ParseIntPipe) id: number, @Body('role') role: UserRole): Promise<User> {
    return this.userService.update(id, { role });
  }

  @ApiOperation({ summary: HandlerSummary.USER_UPDATE_INFO })
  @ApiResponse({ type: User })
  @Patch(':id/info')
  async updateInfo(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateUserInfoDto): Promise<User> {
    return this.userService.update(id, dto);
  }

  @ApiOperation({ summary: HandlerSummary.USER_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.userService.delete(id) };
  }
}
