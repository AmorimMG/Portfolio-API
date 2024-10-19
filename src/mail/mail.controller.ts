import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EmailDto } from './email.dto';
import { MailService } from './mail.service';

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
