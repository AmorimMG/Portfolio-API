import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john' })
  @IsString()
  usuario: string;

  @ApiProperty({ example: 'changeme' })
  @IsString()
  senha: string;
}
