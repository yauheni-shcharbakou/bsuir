import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ControllerTag, HandlerSummary } from './constants/enums';
import { HealthCheckDto } from './shared/dto/health-check.dto';
import { Public } from './modules/auth/decorators/public.decorator';

@ApiTags(ControllerTag.MAIN)
@Controller()
export class AppController {
  @ApiOperation({ summary: HandlerSummary.HEALTH_CHECK })
  @ApiResponse({ type: HealthCheckDto })
  @Public()
  @Get('test')
  healthCheck(): HealthCheckDto {
    return { status: 'ok' };
  }
}
