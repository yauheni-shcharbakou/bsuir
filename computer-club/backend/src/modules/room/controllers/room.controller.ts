import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Req } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../../constants/enums';
import { RoomService } from '../services/room.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { Room } from '../entities/room';
import { DeleteDto } from '../../../shared/dto/delete.dto';
import { RoomDto } from '../dto/room.dto';
import { RoomType } from '../../room-type/room-type';
import { RoomTypeService } from '../../room-type/room-type.service';
import { Public } from '../../auth/decorators/public.decorator';
import { ComputerDto } from '../dto/computer.dto';
import { Computer } from '../entities/computer';
import { ComputerTypeService } from '../../computer-type/computer-type.service';
import { ComputerType } from '../../computer-type/computer-type';
import { ComputerService } from '../services/computer.service';
import { Review } from '../../review/review';
import { ReviewService } from '../../review/review.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.ROOM)
@Controller(EndPoint.ROOMS)
export class RoomController {
  constructor(
    private readonly roomService: RoomService,
    private readonly roomTypeService: RoomTypeService,
    private readonly computerTypeService: ComputerTypeService,
    private readonly computerService: ComputerService,
    private readonly reviewService: ReviewService,
  ) {}

  @ApiOperation({ summary: HandlerSummary.ROOM_GET_ALL_ROOMS })
  @ApiResponse({ type: [Room] })
  @Public()
  @Get()
  async getAllRooms(): Promise<Room[]> {
    return this.roomService.getAll();
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_GET_ROOM_BY_ID })
  @ApiResponse({ type: Room })
  @Public()
  @Get(':id')
  async getRoomById(@Param('id', ParseIntPipe) id: number): Promise<Room> {
    return this.roomService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_GET_ROOM_COMPUTERS })
  @ApiResponse({ type: [Computer] })
  @Public()
  @Get(':id/computers')
  async getRoomComputers(@Param('id', ParseIntPipe) roomId: number): Promise<Computer[]> {
    const room: Room = await this.roomService.getById(roomId);
    return this.computerService.getByRoom(room);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_GET_ROOM_REVIEWS })
  @ApiResponse({ type: [Review] })
  @Public()
  @Get(':id/reviews')
  async getRoomReviews(@Param('id', ParseIntPipe) roomId: number): Promise<Review[]> {
    const room: Room = await this.roomService.getById(roomId);
    return this.reviewService.getByRoom(room);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_CREATE_ROOM })
  @ApiResponse({ type: Room })
  @Roles(UserRole.ADMIN)
  @Post()
  async createRoom(@Body() dto: RoomDto): Promise<Room> {
    const type: RoomType = await this.roomTypeService.getById(dto.type);
    return this.roomService.create(type, dto.name);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_CREATE_ROOM_COMPUTER })
  @ApiResponse({ type: Computer })
  @Roles(UserRole.ADMIN)
  @Post(':id/computers')
  async createRoomComputer(@Param('id', ParseIntPipe) roomId: number, @Body() dto: ComputerDto): Promise<Computer> {
    const room: Room = await this.roomService.getById(roomId);
    const type: ComputerType = await this.computerTypeService.getById(dto.type);
    return this.computerService.create(room, type, dto.code);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_CREATE_ROOM_REVIEW })
  @ApiResponse({ type: Review })
  @Post(':id/reviews')
  async createRoomReview(
    @Req() req,
    @Param('id', ParseIntPipe) roomId: number,
    @Body('text') text: string,
  ): Promise<Review> {
    const room: Room = await this.roomService.getById(roomId);
    return this.reviewService.create(req.user, room, text);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_UPDATE })
  @ApiResponse({ type: Room })
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: RoomDto): Promise<Room> {
    const type: RoomType = await this.roomTypeService.getById(dto.type);
    return this.roomService.update(id, type, dto.name);
  }

  @ApiOperation({ summary: HandlerSummary.ROOM_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.roomService.delete(id) };
  }
}
