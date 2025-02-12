import { Provider } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';

export const CloudinaryProvider: Provider = {
  provide: 'Cloudinary',
  useValue: Cloudinary,
};
