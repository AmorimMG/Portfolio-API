import { Controller, Get, Param } from '@nestjs/common';
import { AnilistService } from './anilist.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

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
