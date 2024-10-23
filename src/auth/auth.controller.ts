import {
  Body,
  Controller,
  HttpException,
  Logger,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

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
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  @UseGuards(LocalAuthGuard)
  @Post('validate')
  async validateUser(@Body() loginDto: LoginDto): Promise<any> {
    try {
      const user = await this.authService.validateUser(
        loginDto.usuario,
        loginDto.senha,
      );
      return user;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw error;
    }
  }
}
