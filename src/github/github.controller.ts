import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GithubService } from './github.service';

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('github')
@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @ApiOperation({ summary: 'Get Github User Data' })
  @ApiResponse({ status: 200, description: 'Returns User Data summaries.' })
  @Get('commits/:username')
  async getCommits(@Param('username') username: string) {
    try {
      return await this.githubService.getUserCommits(username);
    } catch (error) {
      throw new HttpException(
        'Failed to fetch commits',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
