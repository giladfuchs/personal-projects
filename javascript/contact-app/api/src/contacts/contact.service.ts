import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contact } from './contact.entity';
import { CreateContactInput, UpdateContactInput } from './contact.input';
@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async createContact(
    createContactInput: CreateContactInput,
  ): Promise<Contact> {
    const contact = this.contactRepository.create({
      ...createContactInput,
    });

    return this.contactRepository.save(contact);
  }

  async getContacts(
    filterValue: string,
    skip: number,
    limit: number,
  ): Promise<Contact[]> {
    const contacts = await this.contactRepository
      .createQueryBuilder('contact')
      .addSelect(
        'case when contact.nickName IS NULL then CONCAT(contact.firstName, contact.lastName) else contact.nickName end',
        'name',
      )
      .leftJoinAndSelect('contact.photo', 'photo')
      .leftJoinAndSelect('contact.phoneNumbers', 'phoneNumber')
      .where(
        filterValue !== '' ? 'contact.firstName like :firstName' : 'TRUE',
        {
          firstName: '%' + filterValue + '%',
        },
      )
      .orWhere(
        filterValue !== '' ? 'contact.lastName like :lastName' : 'TRUE',
        {
          lastName: '%' + filterValue + '%',
        },
      )
      .orWhere(
        filterValue !== '' ? 'contact.nickName like :nickName' : 'TRUE',
        {
          nickName: '%' + filterValue + '%',
        },
      )
      .orderBy('name', 'ASC')
      .skip(skip)
      .take(limit)
      .getMany();

    return contacts;
  }
  async updateContact(
    id: number,
    updateContactInput: UpdateContactInput,
  ): Promise<any> {
    const contact = await this.contactRepository.findOne(id);
    if (!contact) {
      errorMessage(id);
    }

    const updateContact = {
      ...contact,
      ...updateContactInput,
    };

    await this.contactRepository.save(updateContact);

    return updateContact;
  }

  async deleteContact(id: number): Promise<number> {
    const result = await this.contactRepository.delete(id);

    if (result.affected === 0) {
      errorMessage(id);
    }
    return id;
  }
}
function errorMessage(id: number) {
  throw new NotFoundException(`Contact with ID "${id}" not found`);
}
