import { ObjectType, Field, ID, InputType } from '@nestjs/graphql';

@ObjectType('Photo')
@InputType('InputPhoto')
export class PhotoType {
  @Field((type) => ID)
  id: number;

  @Field()
  imgUrl: string;

  @Field()
  blur: boolean;

  @Field()
  gray: boolean;

  @Field()
  saturation: boolean;
}
