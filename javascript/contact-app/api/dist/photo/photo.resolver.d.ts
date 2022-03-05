import { PhotoService } from './photo.service';
import { CreatePhotoInput } from './photo.input';
export declare class PhotoResolver {
    private photoService;
    constructor(photoService: PhotoService);
    createPhoto(id: number, CreatePhotoInput: CreatePhotoInput): Promise<import("./photo.entity").Photo>;
    updatePhoto(id: number, UpdatePhotoInput: CreatePhotoInput): Promise<import("./photo.entity").Photo>;
    deletePhoto(id: number): Promise<number>;
}
