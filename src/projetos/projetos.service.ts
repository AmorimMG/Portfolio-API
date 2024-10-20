import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
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

  findOne(_id: string): Promise<Projeto> {
    const objectId = new ObjectId(_id);
    return this.projetoRepository.findOneBy({ _id: objectId });
  }

  async create(projeto: Projeto): Promise<Projeto> {
    return this.projetoRepository.save(projeto);
  }

  async update(_id: string, projeto: Projeto): Promise<Projeto> {
    const objectId = new ObjectId(_id);
    const existingProjeto = await this.projetoRepository.findOneBy({
      _id: objectId,
    });

    if (!existingProjeto) {
      throw new NotFoundException(`Projeto with ID ${_id} not found`);
    }

    const updatedProjeto = this.projetoRepository.merge(
      existingProjeto,
      projeto,
    );

    return this.projetoRepository.save(updatedProjeto);
  }

  async remove(_id: string): Promise<void> {
    const objectId = new ObjectId(_id);
    const deleteResult = await this.projetoRepository.delete({ _id: objectId });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Projeto with ID ${_id} not found`);
    }
  }
}
