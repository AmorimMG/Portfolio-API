import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { Usuario } from './usuario.entity';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('usuarios')
@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}
  @ApiOperation({ summary: 'Get Users' })
  @ApiResponse({ status: 200, description: 'Returns Users summaries.' })
  @Get()
  findAll(): Promise<Usuario[]> {
    return this.usuarioService.findAll();
  }

  @ApiOperation({ summary: 'Get User by Id' })
  @ApiResponse({ status: 200, description: 'Returns Users summaries.' })
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Usuario> {
    return this.usuarioService.findOne(+id);
  }

  @ApiOperation({ summary: 'Add User' })
  @ApiResponse({ status: 200, description: 'Add new User.' })
  @Post()
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @ApiOperation({ summary: 'Delete User by Id' })
  @ApiResponse({ status: 200, description: 'Delete a User.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usuarioService.remove(+id);
  }
}
