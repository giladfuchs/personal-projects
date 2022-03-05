import { PhoneNumberType } from 'src/phoneNumber/phoneNumber.type';
import { PhotoType } from 'src/photo/photo.type';
export declare class ContactType {
    id: number;
    firstName: string;
    lastName: string;
    nickName?: string;
    address?: string;
    phoneNumbers?: PhoneNumberType[];
    photo?: PhotoType;
}
