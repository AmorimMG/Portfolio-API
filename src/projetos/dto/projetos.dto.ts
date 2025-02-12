import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ProjetoDto {
  @ApiProperty({ example: 'img/local/example' })
  @IsString()
  img?: string;

  @ApiProperty({ example: 'im a title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'im a subtitle' })
  @IsString()
  subtitle: string;

  @ApiProperty({ example: 'description' })
  @IsString()
  description: string;

  @ApiProperty({ example: 'http://amorim.pro' })
  @IsString()
  link: string;

  @ApiProperty({
    example: ['TypeScript', 'NestJS', 'MongoDB'],
    description: 'Linguagens utilizadas no projeto',
    type: [String],
  })
  linguagens: string[];
}
