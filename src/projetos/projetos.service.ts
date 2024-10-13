import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Projeto } from './projetos.entity';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private projetoRepository: Repository<Projeto>,
  ) {}

  findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find();
  }

  findOne(id: any): Promise<Projeto> {
    return this.projetoRepository.findOneBy({ id });
  }

  async create(projeto: Projeto): Promise<Projeto> {
    return this.projetoRepository.save(projeto);
  }

  async remove(id: number): Promise<void> {
    await this.projetoRepository.delete(id);
  }
}
