import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../../constants/enums';
import { ComputerService } from '../services/computer.service';
import { ComputerTypeService } from '../../computer-type/computer-type.service';
import { Computer } from '../entities/computer';
import { Roles } from '../../auth/decorators/roles.decorator';
import { DeleteDto } from '../../../shared/dto/delete.dto';
import { RoomService } from '../services/room.service';
import { Room } from '../entities/room';
import { ComputerType } from '../../computer-type/computer-type';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../../auth/decorators/public.decorator';
import { BookingService } from '../../booking/booking.service';
import { Booking } from '../../booking/booking';
import { BookingDto } from '../../booking/dto/booking.dto';

@ApiTags(ControllerTag.COMPUTER)
@Controller(EndPoint.COMPUTERS)
export class ComputerController {
  constructor(
    private readonly computerService: ComputerService,
    private readonly computerTypeService: ComputerTypeService,
    private readonly roomService: RoomService,
    private readonly bookingService: BookingService,
  ) {}

  @ApiOperation({ summary: HandlerSummary.COMPUTER_GET_BY_ID })
  @ApiResponse({ type: Computer })
  @Public()
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Computer> {
    return this.computerService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_GET_COMPUTER_BOOKINGS })
  @ApiResponse({ type: [Booking] })
  @Public()
  @Get(':id/bookings')
  async getComputerBookings(@Param('id', ParseIntPipe) id: number): Promise<Booking[]> {
    return this.bookingService.getByComputer(await this.computerService.getById(id));
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_CREATE_COMPUTER_BOOKING })
  @ApiResponse({ type: Booking })
  @Post(':id/bookings')
  async create(@Req() req, @Param('id', ParseIntPipe) id: number, @Body() dto: BookingDto): Promise<Booking> {
    const computer: Computer = await this.computerService.getById(id);
    return this.bookingService.create(req.user, computer, dto);
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_UPDATE_ROOM })
  @ApiResponse({ type: Computer })
  @Roles(UserRole.ADMIN)
  @Patch(':id/room')
  async updateRoom(@Param('id', ParseIntPipe) id: number, @Body('room') roomId: number): Promise<Computer> {
    const room: Room = await this.roomService.getById(roomId);
    return this.computerService.update(id, { room });
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_UPDATE_TYPE })
  @ApiResponse({ type: Computer })
  @Roles(UserRole.ADMIN)
  @Patch(':id/type')
  async updateType(@Param('id', ParseIntPipe) id: number, @Body('type') typeId: number): Promise<Computer> {
    const type: ComputerType = await this.computerTypeService.getById(typeId);
    return this.computerService.update(id, { type });
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_UPDATE_CODE })
  @ApiResponse({ type: Computer })
  @Roles(UserRole.ADMIN)
  @Patch(':id/code')
  async updateCode(@Param('id', ParseIntPipe) id: number, @Body('code') code: number): Promise<Computer> {
    return this.computerService.update(id, { code });
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.computerService.delete(id) };
  }
}
