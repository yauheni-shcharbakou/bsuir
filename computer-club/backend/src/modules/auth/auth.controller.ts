import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { ControllerTag, EndPoint, HandlerSummary } from '../../constants/enums';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Public } from './decorators/public.decorator';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { User } from '../user/user';
import { UserDto } from '../user/dto/user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags(ControllerTag.AUTH)
@Controller(EndPoint.AUTH)
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) {}

  @ApiOperation({ summary: HandlerSummary.AUTH_REFRESH })
  @ApiResponse({ type: AuthDto })
  @Get('refresh')
  async updateToken(@Req() req): Promise<AuthDto> {
    return { token: this.authService.generateToken(req.user) };
  }

  @ApiOperation({ summary: HandlerSummary.AUTH_LOGIN })
  @ApiResponse({ type: AuthDto })
  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Req() req): Promise<AuthDto> {
    return { token: this.authService.generateToken(req.user) };
  }

  @ApiOperation({ summary: HandlerSummary.AUTH_REGISTER })
  @ApiResponse({ type: AuthDto })
  @Public()
  @Post('register')
  async register(@Body() dto: UserDto): Promise<AuthDto> {
    const user: User = await this.userService.create(dto);
    return { token: this.authService.generateToken(user) };
  }
}
