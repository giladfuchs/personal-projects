import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';

import { PhoneNumberType } from './phoneNumber.type';
import { PhoneNumberService } from './phoneNumber.service';
import {
  CreatePhoneNumberInput,
  UpdatePhoneNumberInput,
} from './phoneNumber.input';

@Resolver((of) => PhoneNumberType)
export class PhoneNumberResolver {
  constructor(private phoneNumberService: PhoneNumberService) {}

  @Mutation((returns) => PhoneNumberType)
  createPhoneNumber(
    @Args('id') userId: number,
    @Args('PhoneNumberInput')
    createPhoneNumberInput: CreatePhoneNumberInput,
  ) {
    return this.phoneNumberService.createPhoneNumberInput(
      createPhoneNumberInput,
      userId,
    );
  }

  @Mutation((returns) => PhoneNumberType)
  updatePhoneNumber(
    @Args('id') id: number,
    @Args('PhoneNumberInput')
    CreatePhoneNumberInput: UpdatePhoneNumberInput,
  ) {
    return this.phoneNumberService.updatePhoneNumber(
      id,
      CreatePhoneNumberInput,
    );
  }

  @Mutation((returns) => Number)
  deletePhoneNumber(@Args('id') id: number) {
    return this.phoneNumberService.deletePhoneNumber(id);
  }
}
