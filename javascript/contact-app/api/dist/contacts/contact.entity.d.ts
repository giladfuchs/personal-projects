import { PhoneNumber } from 'src/phoneNumber/phoneNumber.entity';
import { Photo } from 'src/photo/photo.entity';
export declare class Contact {
    id: number;
    firstName: string;
    lastName: string;
    nickName?: string;
    address?: string;
    phoneNumbers?: PhoneNumber[];
    photo?: Photo;
}
