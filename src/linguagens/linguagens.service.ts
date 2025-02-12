import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { LinguagemDto } from './dto/linguagens.dto';
import { Linguagem } from './linguagens.entity';

@Injectable()
export class LinguagemService {
  constructor(
    @InjectRepository(Linguagem)
    private readonly linguagemRepository: Repository<Linguagem>,
  ) {}

  async findAll(): Promise<Linguagem[]> {
    return this.linguagemRepository.find();
  }

  async findOne(_id: string): Promise<Linguagem> {
    const objectId = new ObjectId(_id);
    const linguagem = await this.linguagemRepository.findOneBy({
      _id: objectId,
    });
    if (!linguagem) {
      throw new NotFoundException('Linguagem não encontrada');
    }
    return linguagem;
  }

  async create(dto: LinguagemDto): Promise<Linguagem> {
    const linguagem = this.linguagemRepository.create(dto);
    return this.linguagemRepository.save(linguagem);
  }

  async update(id: string, dto: LinguagemDto): Promise<Linguagem> {
    const linguagem = await this.findOne(id);
    linguagem.nome = dto.nome;
    return this.linguagemRepository.save(linguagem);
  }

  async remove(_id: string): Promise<void> {
    const objectId = new ObjectId(_id);
    const deleteResult = await this.linguagemRepository.delete({
      _id: objectId,
    });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Linguagem with ID ${_id} not found`);
    }
  }
}
