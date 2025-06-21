import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../constants/enums';
import { Event } from './event';
import { Roles } from '../auth/decorators/roles.decorator';
import { EventDto } from './dto/event.dto';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { EventService } from './event.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';

@ApiTags(ControllerTag.EVENT)
@Controller(EndPoint.EVENTS)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiOperation({ summary: HandlerSummary.EVENT_GET_ALL })
  @ApiResponse({ type: [Event] })
  @Public()
  @Get()
  async getAll(): Promise<Event[]> {
    return this.eventService.getAll();
  }

  @ApiOperation({ summary: HandlerSummary.EVENT_GET_BY_USER })
  @ApiResponse({ type: [Event] })
  @Get('by-user')
  async getByUser(@Req() req): Promise<Event[]> {
    return this.eventService.getByUser(req.user);
  }

  @ApiOperation({ summary: HandlerSummary.EVENT_GET_BY_ID })
  @ApiResponse({ type: Event })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Event> {
    return this.eventService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.EVENT_CREATE })
  @ApiResponse({ type: Event })
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: EventDto): Promise<Event> {
    return this.eventService.create(dto);
  }

  @ApiOperation({ summary: HandlerSummary.EVENT_UPDATE_SEEN_BY })
  @Patch(':id/seen-by')
  async updateSeenBy(@Param('id', ParseIntPipe) id: number, @Req() req) {
    await this.eventService.addSeenByUser(id, req.user);
  }

  @ApiOperation({ summary: HandlerSummary.EVENT_UPDATE_INFO })
  @ApiResponse({ type: Event })
  @Roles(UserRole.ADMIN)
  @Patch(':id/info')
  async updateInfo(@Param('id', ParseIntPipe) id: number, @Body() dto: EventDto): Promise<Event> {
    return this.eventService.update(id, dto);
  }

  @ApiOperation({ summary: HandlerSummary.EVENT_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.eventService.delete(id) };
  }
}
