import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Req } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary } from '../../constants/enums';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { BookingService } from './booking.service';
import { Booking } from './booking';
import { BookingDto } from './dto/booking.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.BOOKING)
@Controller(EndPoint.BOOKINGS)
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @ApiOperation({ summary: HandlerSummary.BOOKING_GET_ALL })
  @ApiResponse({ type: [Booking] })
  @Get()
  async getByUser(@Req() req): Promise<Booking[]> {
    return this.bookingService.getByUser(req.user);
  }

  @ApiOperation({ summary: HandlerSummary.BOOKING_GET_BY_ID })
  @ApiResponse({ type: Booking })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Booking> {
    return this.bookingService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.BOOKING_UPDATE })
  @ApiResponse({ type: Booking })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: BookingDto): Promise<Booking> {
    return this.bookingService.update(id, dto);
  }

  @ApiOperation({ summary: HandlerSummary.BOOKING_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.bookingService.delete(id) };
  }
}
