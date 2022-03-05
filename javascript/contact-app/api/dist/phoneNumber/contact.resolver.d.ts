import { ContactService } from './contact.service';
import { CreateContactInput } from './contact.input';
export declare class ConactResolver {
    private contactService;
    constructor(contactService: ContactService);
    contact(id: number): any;
    contacts(): any;
    createContact(CreateContactInput: CreateContactInput): any;
    updateContact(id: number, CreateContactInput: CreateContactInput): any;
    deleteContact(id: number): any;
}
