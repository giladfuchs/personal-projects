import { PhoneNumberService } from './phoneNumber.service';
import { CreatePhoneNumberInput, UpdatePhoneNumberInput } from './phoneNumber.input';
export declare class PhoneNumberResolver {
    private phoneNumberService;
    constructor(phoneNumberService: PhoneNumberService);
    createPhoneNumber(CreatePhoneNumberInput: CreatePhoneNumberInput, userId: number): Promise<import("./phoneNumber.entity").PhoneNumber>;
    updatePhoneNumber(id: number, CreateContactInput: UpdatePhoneNumberInput): Promise<any>;
    deletePhoneNumber(id: number): Promise<number>;
}
