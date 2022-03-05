import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { PhotoType } from './photo.type';
import { PhotoService } from './photo.service';
import { CreatePhotoInput } from './photo.input';

@Resolver((of) => PhotoType)
export class PhotoResolver {
  constructor(private photoService: PhotoService) {}

  @Mutation((returns) => PhotoType)
  createPhoto(
    @Args('id')
    id: number,
    @Args('Photo')
    CreatePhotoInput: CreatePhotoInput,
  ) {
    return this.photoService.createPhoto(id, CreatePhotoInput);
  }
  @Mutation((returns) => PhotoType)
  updatePhoto(
    @Args('id') id: number,
    @Args('Photo') UpdatePhotoInput: CreatePhotoInput,
  ) {
    return this.photoService.updatePhoto(id, UpdatePhotoInput);
  }

  @Mutation((returns) => Number)
  deletePhoto(@Args('id') id: number) {
    return this.photoService.deletePhoto(id);
  }
}
