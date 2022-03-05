import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ContactType } from './contact.type';
import { ContactService } from './contact.service';
import { CreateContactInput, UpdateContactInput } from './contact.input';

@Resolver((of) => ContactType)
export class ConactResolver {
  constructor(private contactService: ContactService) {}

  @Query((returns) => [ContactType])
  contacts(
    @Args('filterValue') filterValue: string,
    @Args('skip') skip: number,
    @Args('limit') limit: number,
    @Args('date') date: string,
  ) {
    return this.contactService.getContacts(filterValue, skip, limit);
  }

  @Mutation((returns) => ContactType)
  createContact(
    @Args('CreateContactInput') createContactInput: CreateContactInput,
  ) {
    return this.contactService.createContact(createContactInput);
  }
  @Mutation((returns) => ContactType)
  updateContact(
    @Args('id') id: number,
    @Args('UpdateContactInput') updateContactInput: UpdateContactInput,
  ) {
    return this.contactService.updateContact(id, updateContactInput);
  }
  @Mutation((returns) => Number)
  deleteContact(@Args('id') id: number) {
    return this.contactService.deleteContact(id);
  }
}
