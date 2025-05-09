import { Controller, Get, Query } from '@nestjs/common';
import { GithubService } from './github.service';

import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({ summary: 'Get Github User Data' })
  @ApiResponse({ status: 200, description: 'Returns User Data summaries.' })
  @Public()
  @Get('contributions')
  async getContributions(@Query('username') username: string): Promise<any> {
    return this.githubService.getContributions(username);
  }
}
