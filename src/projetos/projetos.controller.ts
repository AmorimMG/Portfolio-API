import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { ProjetoDto } from './dto/projetos.dto';
import { Projeto } from './projetos.entity';
import { ProjetoService } from './projetos.service';

@ApiTags('projetos')
@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}
  @ApiOperation({ summary: 'Get projetos' })
  @ApiResponse({ status: 200, description: 'Returns projetos summaries.' })
  @Get()
  findAll(): Promise<Projeto[]> {
    return this.projetoService.findAll();
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @UseGuards(LocalAuthGuard)
  @ApiResponse({ status: 200, description: 'Returns projetos summaries.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Projeto> {
    return this.projetoService.findOne(+id);
  }

  @ApiOperation({ summary: 'Add Project' })
  @ApiResponse({ status: 200, description: 'Add new Project.' })
  @Post()
  @ApiBody({ type: ProjetoDto })
  create(@Body() projeto: Projeto): Promise<Projeto> {
    return this.projetoService.create(projeto);
  }

  @ApiOperation({ summary: 'Update Project' })
  @ApiResponse({ status: 200, description: 'Update a Project.' })
  @Post(':id')
  @ApiBody({ type: ProjetoDto })
  update(@Param('id') id: number, @Body() projeto: Projeto): Promise<Projeto> {
    return this.projetoService.update(id, projeto);
  }

  @ApiOperation({ summary: 'Delete Project by Id' })
  @ApiResponse({ status: 200, description: 'Delete a Project.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.projetoService.remove(+id);
  }

  @ApiOperation({ summary: 'Update Project' })
  @ApiResponse({ status: 200, description: 'Update a Project.' })
  @Put(':id')
  @ApiBody({ type: ProjetoDto })
  update(@Param('id') id: number, @Body() projeto: Projeto): Promise<Projeto> {
    return this.projetoService.update(id, projeto);
  }
}
