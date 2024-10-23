import { Controller, Post } from '@nestjs/common';
import { ShutdownService } from './shutdown.service';

@Controller('shutdown')
export class ShutdownController {
  constructor(private readonly shutdownService: ShutdownService) {}

  @Post()
  shutdownComputer() {
    try {
      const result = this.shutdownService.shutdown();
      return { message: result };
    } catch (error) {
      return { message: 'Falha ao tentar desligar o sistema', error: error.message };
    }
  }
}
