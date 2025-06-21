import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary, UserRole } from '../../constants/enums';
import { OptionService } from './option.service';
import { Roles } from '../auth/decorators/roles.decorator';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { Option } from './option';
import { OptionDto } from './dto/option.dto';
import { Public } from '../auth/decorators/public.decorator';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.OPTION)
@Controller(EndPoint.OPTIONS)
export class OptionController {
  constructor(private readonly optionService: OptionService) {}

  @ApiOperation({ summary: HandlerSummary.OPTION_GET_ALL })
  @ApiResponse({ type: [Option] })
  @Public()
  @Get()
  async getAll(): Promise<Option[]> {
    return this.optionService.getAll();
  }

  @ApiOperation({ summary: HandlerSummary.OPTION_GET_BY_ID })
  @ApiResponse({ type: Option })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Option> {
    return this.optionService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.OPTION_CREATE })
  @ApiResponse({ type: Option })
  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: OptionDto): Promise<Option> {
    return this.optionService.create(dto);
  }

  @ApiOperation({ summary: HandlerSummary.OPTION_UPDATE })
  @ApiResponse({ type: Option })
  @Roles(UserRole.ADMIN)
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: OptionDto): Promise<Option> {
    return this.optionService.update(id, dto);
  }

  @ApiOperation({ summary: HandlerSummary.OPTION_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.optionService.delete(id) };
  }
}
