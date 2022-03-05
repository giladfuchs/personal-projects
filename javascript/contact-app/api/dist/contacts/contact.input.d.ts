import { CreatePhoneNumberInput } from 'src/phoneNumber/phoneNumber.input';
import { CreatePhotoInput } from 'src/photo/photo.input';
export declare class CreateContactInput {
    firstName: string;
    lastName: string;
    nickName?: string;
    address?: string;
    phoneNumbers?: CreatePhoneNumberInput[];
    photo?: CreatePhotoInput;
}
export declare class UpdateContactInput {
    firstName?: string;
    lastName?: string;
    nickName?: string;
    address?: string;
}
