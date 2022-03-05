import { Contact } from 'src/contacts/contact.entity';
export declare class PhoneNumber {
    id: number;
    type: string;
    numericNumber: string;
    user: Contact | {
        ['id']: number;
    };
}
