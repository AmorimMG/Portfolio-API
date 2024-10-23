import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuarioService {
  private readonly logger = new Logger(UsuarioService.name);
  constructor(
    @InjectRepository(Usuario)
    private usuarioRepository: Repository<Usuario>,
  ) {}

  findAll(): Promise<Usuario[]> {
    return this.usuarioRepository.find();
  }

  async findByUser(usuario: string): Promise<Usuario | undefined> {
    this.logger.log('Query for user:', usuario);
    const user = await this.usuarioRepository.findOneBy({ usuario });
    this.logger.log('User found:', user);
    return user;
  }

  async findOne(_id: any): Promise<Usuario> {
    const objectId = new ObjectId(_id);
    return this.usuarioRepository.findOneBy({ _id: objectId });
  }

  async create(usuario: Usuario): Promise<Usuario> {
    return this.usuarioRepository.save(usuario);
  }

  async remove(_id: any): Promise<void> {
    const objectId = new ObjectId(_id);
    await this.usuarioRepository.delete({ _id: objectId });
  }
}
