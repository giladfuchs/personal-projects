import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactInput } from './contact.input';
export declare class ContactService {
    private contactRepository;
    constructor(contactRepository: Repository<Contact>);
    getContactById(id: number): Promise<Contact>;
    createContact(createContactInput: CreateContactInput): Promise<Contact>;
    getContacts(): Promise<Contact[]>;
    updateContact(id: number, createContactInput: CreateContactInput): Promise<Contact>;
    deleteContact(id: number): Promise<number>;
}
