import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LinguagemDto } from './dto/linguagens.dto';
import { Linguagem } from './linguagens.entity';
import { LinguagemService } from './linguagens.service';

@ApiTags('linguagens')
@Controller('linguagens')
export class LinguagemController {
  constructor(private readonly linguagemService: LinguagemService) {}

  @ApiOperation({ summary: 'Obter todas as linguagens' })
  @ApiResponse({ status: 200, description: 'Lista de linguagens' })
  @Get()
  findAll(): Promise<Linguagem[]> {
    return this.linguagemService.findAll();
  }

  @ApiOperation({ summary: 'Obter uma linguagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Retorna a linguagem especificada' })
  @ApiResponse({ status: 404, description: 'Linguagem não encontrada' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Linguagem> {
    return this.linguagemService.findOne(id);
  }

  @ApiOperation({ summary: 'Criar uma nova linguagem' })
  @ApiResponse({ status: 201, description: 'Linguagem criada com sucesso' })
  @ApiBody({ type: LinguagemDto })
  @Post()
  create(@Body() dto: LinguagemDto): Promise<Linguagem> {
    return this.linguagemService.create(dto);
  }

  @ApiOperation({ summary: 'Atualizar uma linguagem existente' })
  @ApiResponse({ status: 200, description: 'Linguagem atualizada com sucesso' })
  @ApiResponse({ status: 404, description: 'Linguagem não encontrada' })
  @ApiBody({ type: LinguagemDto })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: LinguagemDto,
  ): Promise<Linguagem> {
    return this.linguagemService.update(id, dto);
  }

  @ApiOperation({ summary: 'Remover uma linguagem pelo ID' })
  @ApiResponse({ status: 200, description: 'Linguagem removida com sucesso' })
  @ApiResponse({ status: 404, description: 'Linguagem não encontrada' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.linguagemService.remove(id);
  }
}
