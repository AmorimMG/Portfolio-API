import { Controller, Get, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AnilistService } from './anilist.service';

@ApiTags('anilist')
@Controller('anilist')
export class AnilistController {
  constructor(private readonly anilistService: AnilistService) {}

  @ApiOperation({ summary: 'Get Anilist History Map' })
  @ApiResponse({ status: 200, description: 'Returns Anilist History Map.' })
  @Get(':name')
  async fetchData(@Param('name') name: string) {
    return this.anilistService.fetchData(name);
  }
}
