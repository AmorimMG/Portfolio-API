import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LinguagemController } from './linguagens.controller';
import { Linguagem } from './linguagens.entity';
import { LinguagemService } from './linguagens.service';

@Module({
  imports: [TypeOrmModule.forFeature([Linguagem])],
  controllers: [LinguagemController],
  providers: [LinguagemService],
  exports: [LinguagemService],
})
export class LinguagemModule {}
