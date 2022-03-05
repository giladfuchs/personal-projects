import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactInput, UpdateContactInput } from './contact.input';
export declare class ContactService {
    private contactRepository;
    constructor(contactRepository: Repository<Contact>);
    createContact(createContactInput: CreateContactInput): Promise<Contact>;
    getContacts(filterValue: string, skip: number, limit: number): Promise<Contact[]>;
    updateContact(id: number, updateContactInput: UpdateContactInput): Promise<any>;
    deleteContact(id: number): Promise<number>;
}
