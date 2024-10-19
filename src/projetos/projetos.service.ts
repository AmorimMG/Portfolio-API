import { Injectable, NotFoundException } from '@nestjs/common';
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

  async update(id: any, projeto: Projeto): Promise<Projeto> {
    const existingProjeto = await this.projetoRepository.findOneBy({ id });

    if (!existingProjeto) {
      throw new NotFoundException(`Projeto with ID ${id} not found`);
    }

    const updatedProjeto = this.projetoRepository.merge(
      existingProjeto,
      projeto,
    );

    return this.projetoRepository.save(updatedProjeto);
  }

  async remove(id: number): Promise<void> {
    const deleteResult = await this.projetoRepository.delete(id);

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Projeto with ID ${id} not found`);
    }
  }
}
