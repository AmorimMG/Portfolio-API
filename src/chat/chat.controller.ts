import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ChatService } from './chat.service';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @ApiOperation({ summary: 'Post a message to the chatbot' })
  @Public()
  @Post('send')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        prompt: { type: 'string' },
        context: { type: 'string' },
      },
      required: ['prompt', 'context'],
    },
  })
  @ApiResponse({ status: 200, description: 'Message sent successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async sendMessage(@Body() body: { prompt: string; context: string }) {
    const { prompt, context } = body;
    return this.chatService.sendMessageToGemini(prompt, context);
  }
}
