import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty({ example: 'john' })
  @IsString()
  usuario: string;

  @ApiProperty({ example: 'changeme' })
  @IsString()
  senha: string;

  @ApiProperty({ example: 'john@doe.com' })
  @IsString()
  email: string;
}
