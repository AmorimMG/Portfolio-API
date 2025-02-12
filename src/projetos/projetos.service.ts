import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { v2 as Cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import * as streamifier from 'streamifier';
import { Repository } from 'typeorm';
import { ProjetoDto } from './dto/projetos.dto';
import { Projeto } from './projetos.entity';

@Injectable()
export class ProjetoService {
  constructor(
    @InjectRepository(Projeto)
    private projetoRepository: Repository<Projeto>,
    @Inject('Cloudinary') private cloudinary: typeof Cloudinary,
  ) {}

  async findAll(): Promise<Projeto[]> {
    return this.projetoRepository.find();
  }

  async findOne(_id: string): Promise<Projeto> {
    const objectId = new ObjectId(_id);
    const projeto = await this.projetoRepository.findOneBy({ _id: objectId });

    if (!projeto) {
      throw new NotFoundException(`Projeto with ID ${_id} not found`);
    }

    return projeto;
  }

  async uploadImage(file: Express.Multer.File): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('File is missing or not uploaded correctly.');
    }

    console.log('Uploading to Cloudinary:', file.originalname); // Debugging

    return new Promise((resolve, reject) => {
      const uploadStream = this.cloudinary.uploader.upload_stream(
        {
          resource_type: 'auto', // Automatically detect the file type (image, video, etc.)
          public_id: file.originalname.split('.')[0], // You can create a custom public_id if needed
        },
        (error, result) => {
          if (error) {
            reject('Error uploading to Cloudinary: ' + error.message);
          } else {
            resolve(result.secure_url);
          }
        },
      );

      // Stream the buffer to Cloudinary
      streamifier.createReadStream(file.buffer).pipe(uploadStream);
    });
  }

  async create(
    projetoDto: ProjetoDto,
    file?: Express.Multer.File,
  ): Promise<Projeto> {
    const projeto = new Projeto();
    Object.assign(projeto, projetoDto);

    if (file) {
      const imageUrl = await this.uploadImage(file);
      projeto.img = imageUrl; // Store Cloudinary URL
    }

    return this.projetoRepository.save(projeto);
  }

  async update(
    id: string,
    projetoDto: ProjetoDto,
    file: Express.Multer.File,
  ): Promise<Projeto> {
    const projeto = await this.findOne(id);
    if (!projeto) {
      throw new NotFoundException('Project not found');
    }

    const fileUrl = await this.uploadImage(file);

    projeto.title = projetoDto.title || projeto.title;
    projeto.subtitle = projetoDto.subtitle || projeto.subtitle;
    projeto.description = projetoDto.description || projeto.description;
    projeto.link = projetoDto.link || projeto.link;
    projeto.img = fileUrl;

    return await this.projetoRepository.save(projeto);
  }

  async remove(_id: string): Promise<void> {
    const objectId = new ObjectId(_id);
    const deleteResult = await this.projetoRepository.delete({ _id: objectId });

    if (deleteResult.affected === 0) {
      throw new NotFoundException(`Projeto with ID ${_id} not found`);
    }
  }
}
