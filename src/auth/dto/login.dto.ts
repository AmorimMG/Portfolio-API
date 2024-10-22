import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'john' })
  @IsString()
  usuario: string;

  @ApiProperty({ example: 'changeme' })
  @IsString()
  senha: string;
}
