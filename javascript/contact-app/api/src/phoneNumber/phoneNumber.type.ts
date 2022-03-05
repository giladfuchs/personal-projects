import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType('PhoneNumber')
@InputType('InputPhoneNumber')
export class PhoneNumberType {
  @Field((type) => ID)
  id: number;

  @Field()
  type: string;

  @Field()
  numericNumber: string;
}
