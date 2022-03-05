import { Repository } from 'typeorm';
import { PhoneNumber } from './phoneNumber.entity';
import { CreatePhoneNumberInput, UpdatePhoneNumberInput } from './phoneNumber.input';
export declare class PhoneNumberService {
    private phoneNumberRepository;
    constructor(phoneNumberRepository: Repository<PhoneNumber>);
    createPhoneNumberInput(createPhoneNumberInput: CreatePhoneNumberInput, userId: number): Promise<PhoneNumber>;
    updatePhoneNumber(id: number, updatePhoneNumberInput: UpdatePhoneNumberInput): Promise<PhoneNumber>;
    deletePhoneNumber(id: number): Promise<number>;
}
