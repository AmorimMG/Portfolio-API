import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjetoService } from './projetos.service';
import { ProjetoController } from './projetos.controller';
import { Projeto } from './projetos.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto])],
  providers: [ProjetoService],
  controllers: [ProjetoController],
  exports: [ProjetoService],
})
export class ProjetoModule {}
