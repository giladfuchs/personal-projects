import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Photo } from './photo.entity';
import { PhotoService } from './photo.service';
import { PhotoResolver } from './photo.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Photo])],
  providers: [PhotoResolver, PhotoService],
})
export class PhotoModule {}
