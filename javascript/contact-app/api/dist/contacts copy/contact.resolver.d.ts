import { ContactService } from './contact.service';
import { CreateContactInput } from './contact.input';
import { Contact } from './contact.entity';
export declare class ConactResolver {
    private contactService;
    constructor(contactService: ContactService);
    contact(id: number): Promise<Contact>;
    contacts(): Promise<Contact[]>;
    createContact(CreateContactInput: CreateContactInput): Promise<Contact>;
    updateContact(id: number, CreateContactInput: CreateContactInput): Promise<Contact>;
    deleteContact(id: number): Promise<number>;
}
