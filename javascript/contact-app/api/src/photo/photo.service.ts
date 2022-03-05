import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoInput } from './photo.input';
@Injectable()
export class PhotoService {
  constructor(
    @InjectRepository(Photo)
    private photoRepository: Repository<Photo>,
  ) {}

  async createPhoto(
    userId: number,
    createPhoneNumberInput: CreatePhotoInput,
  ): Promise<Photo> {
    const photo = this.photoRepository.create({
      ...createPhoneNumberInput,
    });
    photo.user = { id: userId };
    try {
      await this.photoRepository.save(photo);
    } catch (error) {
      throw new BadRequestException(error.detail);
    }

    return photo;
  }

  async updatePhoto(
    photoId: number,
    updatePhotoInput: CreatePhotoInput,
  ): Promise<Photo> {
    const photo = await this.photoRepository.findOne(photoId);
    if (!photo) {
      errorMessage(photoId);
    }

    const updatePhoto = {
      ...photo,
      ...updatePhotoInput,
    };

    await this.photoRepository.save(updatePhoto);

    return updatePhoto;
  }
  async deletePhoto(id: number): Promise<number> {
    const result = await this.photoRepository.delete(id);

    if (result.affected === 0) {
      errorMessage(id);
    }
    return id;
  }
}
function errorMessage(id: number) {
  throw new NotFoundException(`Photo with ID "${id}" not found`);
}
