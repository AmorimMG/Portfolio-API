import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ProjetoDto {
  @ApiProperty({ example: 'img/local/example' })
  @IsString()
  img: string;

  @ApiProperty({ example: 'im a title' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'im a subtitle' })
  @IsString()
  subtitle: string;

  @ApiProperty({ example: 'lorem ipsum' })
  @IsString()
  description: string;
}
