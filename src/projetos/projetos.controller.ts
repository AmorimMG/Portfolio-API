import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Public } from 'src/common/decorators/public.decorator';
import { ProjetoDto } from './dto/projetos.dto';
import { Projeto } from './projetos.entity';
import { ProjetoService } from './projetos.service';

@ApiTags('projetos')
@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @ApiOperation({ summary: 'Get all projects' })
  @ApiResponse({ status: 200, description: 'Returns all projects.' })
  @Public()
  @Get()
  async findAll(): Promise<Projeto[]> {
    return this.projetoService.findAll();
  }

  @ApiOperation({ summary: 'Get project by ID' })
  @ApiResponse({ status: 200, description: 'Returns a project by ID.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Projeto> {
    return this.projetoService.findOne(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image along with project details',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        title: { type: 'string' },
        subtitle: { type: 'string' },
        description: { type: 'string' },
        link: { type: 'string' },
        linguagens: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  })
  async create(
    @Body() projetoDto: ProjetoDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Projeto> {
    // Check if file is received
    if (!file) {
      console.log('File is missing or not uploaded correctly');
      throw new BadRequestException('File is required');
    }

    console.log('Received file:', file); // Log the file object

    return this.projetoService.create(projetoDto, file);
  }

  @ApiOperation({ summary: 'Update an existing project' })
  @ApiResponse({ status: 200, description: 'Project updated successfully.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data') // Indicate the form data type
  @ApiBody({
    description: 'Update a project with a new file',
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary', // The file format
        },
        title: { type: 'string' },
        subtitle: { type: 'string' },
        description: { type: 'string' },
        link: { type: 'string' },
        linguagens: {
          type: 'array',
          items: { type: 'string' },
        },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() projetoDto: ProjetoDto,
    @UploadedFile() file: Express.Multer.File, // Handle the uploaded file
  ): Promise<Projeto> {
    // Check if file is received
    if (!file) {
      console.log('File is missing or not uploaded correctly');
      throw new BadRequestException('File is required');
    }

    console.log('Received file for update:', file); // Log the file object

    return this.projetoService.update(id, projetoDto, file); // Pass file to service
  }

  @ApiOperation({ summary: 'Delete a project by ID' })
  @ApiResponse({ status: 200, description: 'Project deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projetoService.remove(id);
  }
}
