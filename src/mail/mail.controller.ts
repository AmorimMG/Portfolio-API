import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from './mail.service';
import { EmailDto } from './email.dto';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}

  @ApiOperation({ summary: 'Send email' })
  @ApiResponse({ status: 200, description: 'Returns Email sent successfully.' })
  @ApiBody({ type: EmailDto, description: 'Email object' })
  @Post('/send-email')
  async sendEmail(@Body() emailDto: EmailDto): Promise<string> {
    const { name, email, message } = emailDto;
    await this.mailService.sendMail(name, email, message);
    return 'Email sent successfully';
  }
}
