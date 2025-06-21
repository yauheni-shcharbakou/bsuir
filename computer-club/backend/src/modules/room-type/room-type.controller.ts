import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../constants/enums';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { RoomTypeService } from './room-type.service';
import { RoomType } from './room-type';
import { RoomTypeDto } from './dto/room-type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.ROOM_TYPE)
@Controller(EndPoint.ROOM_TYPES)
export class RoomTypeController {
  constructor(private readonly roomTypeService: RoomTypeService) {}

  @ApiOperation({ summary: HandlerSummary.ROOM_TYPE_GET_ALL })
  @ApiResponse({ type: [RoomType] })
  @Public()
  @Get()
  async getAll(): Promise<RoomType[]> {
    return this.roomTypeService.getAll();
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_TYPE_GET_BY_ID })
  @ApiResponse({ type: RoomType })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<RoomType> {
    return this.roomTypeService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_TYPE_CREATE })
  @ApiResponse({ type: RoomType })
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: RoomTypeDto): Promise<RoomType> {
    return this.roomTypeService.create(dto);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_TYPE_UPDATE })
  @ApiResponse({ type: RoomType })
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: RoomTypeDto): Promise<RoomType> {
    return this.roomTypeService.update(id, dto);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_TYPE_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.roomTypeService.delete(id) };
  }
}
