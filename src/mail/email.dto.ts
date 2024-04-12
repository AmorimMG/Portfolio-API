import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
  @ApiProperty({ description: 'Name of the sender' })
  name: string;

  @ApiProperty({ description: 'Email address of the sender' })
  email: string;

  @ApiProperty({ description: 'Message content' })
  message: string;
}
