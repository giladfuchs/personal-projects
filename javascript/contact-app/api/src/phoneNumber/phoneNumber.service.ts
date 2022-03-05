import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PhoneNumber } from './phoneNumber.entity';
import {
  CreatePhoneNumberInput,
  UpdatePhoneNumberInput,
} from './phoneNumber.input';
@Injectable()
export class PhoneNumberService {
  constructor(
    @InjectRepository(PhoneNumber)
    private phoneNumberRepository: Repository<PhoneNumber>,
  ) {}

  async createPhoneNumberInput(
    createPhoneNumberInput: CreatePhoneNumberInput,
    userId: number,
  ): Promise<PhoneNumber> {
    const phoneNumber = this.phoneNumberRepository.create({
      ...createPhoneNumberInput,
    });
    phoneNumber.user = { id: userId };
    return this.phoneNumberRepository.save(phoneNumber);
  }

  async updatePhoneNumber(
    id: number,
    updatePhoneNumberInput: UpdatePhoneNumberInput,
  ): Promise<PhoneNumber> {
    const phoneNumber = await this.phoneNumberRepository.findOne(id);
    if (!phoneNumber) {
      errorMessage(id);
    }

    const updatePhoneNumber = {
      ...phoneNumber,
      ...updatePhoneNumberInput,
    };

    await this.phoneNumberRepository.save(updatePhoneNumber);

    return updatePhoneNumber;
  }
  async deletePhoneNumber(id: number): Promise<number> {
    const result = await this.phoneNumberRepository.delete(id);

    if (result.affected === 0) {
      errorMessage(id);
    }
    return id;
  }
}
function errorMessage(id: number) {
  throw new NotFoundException(`Phone number with ID "${id}" not found`);
}
