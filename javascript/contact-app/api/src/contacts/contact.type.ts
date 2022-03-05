import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';
import { PhoneNumberType } from 'src/phoneNumber/phoneNumber.type';
import { PhotoType } from 'src/photo/photo.type';
@ObjectType('Contact')
@InputType('ContactInput')
export class ContactType {
  @Field((type) => ID)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ nullable: true })
  nickName?: string;

  @Field({ nullable: true })
  address?: string;

  @Field((type) => [PhoneNumberType])
  phoneNumbers?: PhoneNumberType[];

  @Field((type) => PhotoType, { nullable: true })
  photo?: PhotoType;
}
