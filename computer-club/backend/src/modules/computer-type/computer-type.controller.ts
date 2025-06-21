import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../constants/enums';
import { Public } from '../auth/decorators/public.decorator';
import { Roles } from '../auth/decorators/roles.decorator';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { ComputerTypeService } from './computer-type.service';
import { ComputerType } from './computer-type';
import { ComputerTypeDto } from './dto/computer-type.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.COMPUTER_TYPE)
@Controller(EndPoint.COMPUTER_TYPES)
export class ComputerTypeController {
  constructor(private readonly computerTypeService: ComputerTypeService) {}

  @ApiOperation({ summary: HandlerSummary.COMPUTER_TYPE_GET_ALL })
  @ApiResponse({ type: [ComputerType] })
  @Public()
  @Get()
  async getAll(): Promise<ComputerType[]> {
    return this.computerTypeService.getAll();
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_TYPE_GET_BY_ID })
  @ApiResponse({ type: ComputerType })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<ComputerType> {
    return this.computerTypeService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_TYPE_CREATE })
  @ApiResponse({ type: ComputerType })
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: ComputerTypeDto): Promise<ComputerType> {
    return this.computerTypeService.create(dto);
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_TYPE_UPDATE })
  @ApiResponse({ type: ComputerType })
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: ComputerTypeDto): Promise<ComputerType> {
    return this.computerTypeService.update(id, dto);
  }

  @ApiOperation({ summary: HandlerSummary.COMPUTER_TYPE_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.computerTypeService.delete(id) };
  }
}
