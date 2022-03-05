import { Contact } from 'src/contacts/contact.entity';
export declare class Photo {
    id: number;
    imgUrl: string;
    blur: boolean;
    gray: boolean;
    saturation: boolean;
    user: Contact | {
        ['id']: number;
    };
}
