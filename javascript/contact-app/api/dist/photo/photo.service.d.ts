import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { CreatePhotoInput } from './photo.input';
export declare class PhotoService {
    private photoRepository;
    constructor(photoRepository: Repository<Photo>);
    createPhoto(userId: number, createPhoneNumberInput: CreatePhotoInput): Promise<Photo>;
    updatePhoto(photoId: number, updatePhotoInput: CreatePhotoInput): Promise<Photo>;
    deletePhoto(id: number): Promise<number>;
}
