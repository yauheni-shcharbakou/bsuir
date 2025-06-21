import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../constants/enums';
import { OrderService } from './order.service';
import { OptionService } from '../option/option.service';
import { Option } from '../option/option';
import { Roles } from '../auth/decorators/roles.decorator';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { Order } from './order';
import { OrderDto } from './dto/order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.ORDER)
@Controller(EndPoint.ORDERS)
export class OrderController {
  constructor(private readonly orderService: OrderService, private readonly optionService: OptionService) {}

  @ApiOperation({ summary: HandlerSummary.ORDER_GET_BY_USER })
  @ApiResponse({ type: [Order] })
  @Get()
  async getByUser(@Req() req): Promise<Order[]> {
    return this.orderService.getByUser(req.user);
  }

  @ApiOperation({ summary: HandlerSummary.ORDER_GET_BY_ID })
  @ApiResponse({ type: Order })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Order> {
    return this.orderService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.ORDER_CREATE })
  @ApiResponse({ type: Order })
  @Post()
  async create(@Req() req, @Body() dto: OrderDto): Promise<Order> {
    const option: Option = await this.optionService.getById(dto.option);
    return this.orderService.create(req.user, option, dto.amount);
  }

  @ApiOperation({ summary: HandlerSummary.ORDER_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.orderService.delete(id) };
  }
}
