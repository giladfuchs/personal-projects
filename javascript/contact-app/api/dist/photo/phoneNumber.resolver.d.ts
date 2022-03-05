import { PhoneNumberService } from './phoneNumber.service';
import { CreatePhoneNumberInput, UpdatePhoneNumberInput } from './phoneNumber.input';
export declare class PhoneNumberResolver {
    private phoneNumberService;
    constructor(phoneNumberService: PhoneNumberService);
    createPhoneNumber(CreatePhoneNumberInput: CreatePhoneNumberInput, userId: number): any;
    updatePhoneNumber(id: number, CreateContactInput: UpdatePhoneNumberInput): any;
    deletePhoneNumber(id: number): any;
}
