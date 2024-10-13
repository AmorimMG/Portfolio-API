import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {

  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  findOne(id: any): Promise<Usuario> {
    return this.usuarioRepository.findOneBy({ id });
  }

  async findByUser(usuario: string): Promise<Usuario | undefined> {
    return this.usuarioRepository.findOne({ where: { usuario } });
  }
  
  async create(usuario: Usuario): Promise<Usuario> {
    const hashedPassword = await bcrypt.hash(usuario.senha, 10);
    const userToSave = { ...usuario, senha: hashedPassword };
    return this.usuarioRepository.save(userToSave);
  }

  async remove(id: number): Promise<void> {
    await this.usuarioRepository.delete(id);
  }
}
