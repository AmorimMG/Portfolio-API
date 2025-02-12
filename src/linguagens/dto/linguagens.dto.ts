import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LinguagemDto {
  @ApiProperty({ example: 'JavaScript' })
  @IsString()
  nome: string;
}
