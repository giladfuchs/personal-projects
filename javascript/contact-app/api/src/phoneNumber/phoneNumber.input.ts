import { InputType, Field } from '@nestjs/graphql';
import { IsNumberString, MinLength } from 'class-validator';

@InputType()
export class CreatePhoneNumberInput {
  @MinLength(4)
  @Field()
  type: string;

  @MinLength(8)
  @IsNumberString()
  @Field()
  numericNumber: string;
}

@InputType()
export class UpdatePhoneNumberInput {
  @MinLength(4)
  @Field()
  type: string;

  @MinLength(8)
  @IsNumberString()
  @Field()
  numericNumber: string;
}
