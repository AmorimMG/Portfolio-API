import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Logger,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { IgdbService } from './igdb.service';

@ApiTags('igdb')
@Controller('igdb')
export class IgdbController {
  private readonly logger = new Logger(IgdbController.name);

  constructor(private readonly igdbService: IgdbService) {}

  @ApiOperation({ summary: 'Get game icon by name' })
  @ApiResponse({ status: 200, description: 'Returns game data with icon URL.' })
  @Public()
  @Get('game-icon')
  @HttpCode(HttpStatus.OK)
  async getGameIcon(@Query('name') gameName: string): Promise<any> {
    try {
      return await this.igdbService.getGameIcon(gameName);
    } catch (error) {
      this.logger.error('Error fetching game icon:', error);
      throw error;
    }
  }

  @ApiOperation({ summary: 'Get exact game match icon' })
  @ApiResponse({ status: 200, description: 'Returns exact game match with icon URL.' })
  @Public()
  @Get('exact-game')
  @HttpCode(HttpStatus.OK)
  async getExactGameIcon(@Query('name') gameName: string): Promise<any> {
    try {
      return await this.igdbService.getExactGameIcon(gameName);
    } catch (error) {
      this.logger.error('Error fetching exact game icon:', error);
      throw error;
    }
  }
}
