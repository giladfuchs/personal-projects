import { InputType, Field } from '@nestjs/graphql';
import { Type } from 'class-transformer';

import {
  IsArray,
  IsDefined,
  IsOptional,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreatePhoneNumberInput } from 'src/phoneNumber/phoneNumber.input';
import { CreatePhotoInput } from 'src/photo/photo.input';

@InputType()
export class CreateContactInput {
  @MinLength(1)
  @Field()
  firstName: string;

  @MinLength(1)
  @Field()
  lastName: string;

  @IsOptional()
  @Field({ nullable: true })
  nickName?: string;

  @IsOptional()
  @Field({ nullable: true })
  address?: string;

  @IsArray()
  @IsOptional()
  @ValidateNested()
  @IsDefined()
  @Type((type) => CreatePhoneNumberInput)
  @Field((type) => [CreatePhoneNumberInput], { nullable: true })
  phoneNumbers?: CreatePhoneNumberInput[];

  @IsOptional()
  @ValidateNested()
  @IsDefined()
  @Type((type) => CreatePhotoInput)
  @Field((type) => CreatePhotoInput, { nullable: true })
  photo?: CreatePhotoInput;
}

@InputType()
export class UpdateContactInput {
  @IsOptional()
  @Field({ nullable: true })
  firstName?: string;

  @IsOptional()
  @Field({ nullable: true })
  lastName?: string;

  @IsOptional()
  @Field({ nullable: true })
  nickName?: string;

  @IsOptional()
  @Field({ nullable: true })
  address?: string;
}
