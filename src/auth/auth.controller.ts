import {
  Body,
  Controller,
  HttpException,
  Logger,
  Post,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Login' })
  @ApiResponse({ status: 200, description: 'Returns JWT token.' })
  @ApiBody({ type: LoginDto })
  @Public()
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.debug('Login Request:', loginDto);

    // Validate user before logging in
    const user = await this.authService.validateUser(
      loginDto.usuario,
      loginDto.senha,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @ApiOperation({ summary: 'Validate User' })
  @ApiResponse({ status: 200, description: 'Returns User.' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiBody({ type: LoginDto })
  @UseGuards(AuthGuard)
  @Post('validate')
  async validateUser(@Body() loginDto: LoginDto): Promise<any> {
    try {
      return await this.authService.validateUser(
        loginDto.usuario,
        loginDto.senha,
      );
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw new HttpException(error.message, error.getStatus());
      }
      throw error;
    }
  }
}
