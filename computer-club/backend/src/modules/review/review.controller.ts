import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary } from '../../constants/enums';
import { DeleteDto } from '../../shared/dto/delete.dto';
import { ReviewService } from './review.service';
import { Review } from './review';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.REVIEW)
@Controller(EndPoint.REVIEWS)
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: HandlerSummary.REVIEW_GET_BY_ID })
  @ApiResponse({ type: Review })
  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<Review> {
    return this.reviewService.getById(id);
  }

  @ApiOperation({ summary: HandlerSummary.REVIEW_UPDATE })
  @ApiResponse({ type: Review })
  @Put(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body('text') text: string): Promise<Review> {
    return this.reviewService.update(id, text);
  }

  @ApiOperation({ summary: HandlerSummary.REVIEW_DELETE })
  @ApiResponse({ type: DeleteDto })
  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<DeleteDto> {
    return { id: await this.reviewService.delete(id) };
  }
}
