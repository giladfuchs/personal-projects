import { ContactService } from './contact.service';
import { CreateContactInput, UpdateContactInput } from './contact.input';
export declare class ConactResolver {
    private contactService;
    constructor(contactService: ContactService);
    contacts(filterValue: string, skip: number, limit: number, date: string): Promise<import("./contact.entity").Contact[]>;
    createContact(createContactInput: CreateContactInput): Promise<import("./contact.entity").Contact>;
    updateContact(id: number, updateContactInput: UpdateContactInput): Promise<any>;
    deleteContact(id: number): Promise<number>;
}
