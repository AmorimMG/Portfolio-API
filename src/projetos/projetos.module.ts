import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';
import { ProjetoController } from './projetos.controller';
import { Projeto } from './projetos.entity';
import { ProjetoService } from './projetos.service';

@Module({
  imports: [TypeOrmModule.forFeature([Projeto]), CloudinaryModule],
  providers: [ProjetoService],
  controllers: [ProjetoController],
  exports: [ProjetoService],
})
export class ProjetoModule {}
