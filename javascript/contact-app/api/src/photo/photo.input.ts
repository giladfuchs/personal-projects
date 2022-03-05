import { InputType, Field } from '@nestjs/graphql';
import { IsBoolean, MinLength } from 'class-validator';
@InputType()
export class CreatePhotoInput {
  @MinLength(4)
  @Field()
  imgUrl: string;

  @IsBoolean()
  @Field({ nullable: true })
  blur: boolean;

  @IsBoolean()
  @Field({ nullable: true })
  gray: boolean;

  @IsBoolean()
  @Field({ nullable: true })
  saturation: boolean;
}
