import { PhoneNumberService } from './phoneNumber.service';
import { CreatePhoneNumberInput, UpdatePhoneNumberInput } from './phoneNumber.input';
export declare class PhoneNumberResolver {
    private phoneNumberService;
    constructor(phoneNumberService: PhoneNumberService);
    createPhoneNumber(userId: number, createPhoneNumberInput: CreatePhoneNumberInput): Promise<import("./phoneNumber.entity").PhoneNumber>;
    updatePhoneNumber(id: number, CreatePhoneNumberInput: UpdatePhoneNumberInput): Promise<import("./phoneNumber.entity").PhoneNumber>;
    deletePhoneNumber(id: number): Promise<number>;
}
