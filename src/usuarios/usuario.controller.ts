import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsuarioDto } from './dto/usuario.dto';
import { Usuario } from './usuario.entity';
import { UsuarioService } from './usuario.service';

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
    return this.usuarioService.findOne(id);
  }
  @ApiOperation({ summary: 'Get User by Username' })
  @ApiResponse({ status: 200, description: 'Returns User by Username.' })
  @Get('username/:usuario')
  findByUser(@Param('usuario') usuario: string): Promise<Usuario> {
    return this.usuarioService.findByUser(usuario);
  }

  @ApiOperation({ summary: 'Add User' })
  @ApiResponse({ status: 200, description: 'Add new User.' })
  @Post()
  @ApiBody({ type: UsuarioDto })
  create(@Body() usuario: Usuario): Promise<Usuario> {
    return this.usuarioService.create(usuario);
  }

  @ApiOperation({ summary: 'Delete User by Id' })
  @ApiResponse({ status: 200, description: 'Delete a User.' })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.usuarioService.remove(id);
  }
}
