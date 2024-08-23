import { Controller, Request, Post, UseGuards, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Returns JWT token.' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    this.logger.debug('Request User:', req.user);
    return this.authService.login(req.user);
  }

  @ApiOperation({ summary: 'Validate User' })
  @ApiResponse({ status: 200, description: 'Returns User.' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('validate')
  async validateUser(@Body() loginDto: LoginDto): Promise<any> {
    const user = await this.authService.validateUser(loginDto.usuario, loginDto.senha);
    if (user) {
      return user;
    }
    return null;
  }
}
