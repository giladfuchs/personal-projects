"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const contact_entity_1 = require("./contact.entity");
let ContactService = class ContactService {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    async createContact(createContactInput) {
        const contact = this.contactRepository.create(Object.assign({}, createContactInput));
        return this.contactRepository.save(contact);
    }
    async getContacts(filterValue, skip, limit) {
        const contacts = await this.contactRepository
            .createQueryBuilder('contact')
            .addSelect('case when contact.nickName IS NULL then CONCAT(contact.firstName, contact.lastName) else contact.nickName end', 'name')
            .leftJoinAndSelect('contact.photo', 'photo')
            .leftJoinAndSelect('contact.phoneNumbers', 'phoneNumber')
            .where(filterValue !== '' ? 'contact.firstName like :firstName' : 'TRUE', {
            firstName: '%' + filterValue + '%',
        })
            .orWhere(filterValue !== '' ? 'contact.lastName like :lastName' : 'TRUE', {
            lastName: '%' + filterValue + '%',
        })
            .orWhere(filterValue !== '' ? 'contact.nickName like :nickName' : 'TRUE', {
            nickName: '%' + filterValue + '%',
        })
            .orderBy('name', 'ASC')
            .skip(skip)
            .take(limit)
            .getMany();
        return contacts;
    }
    async updateContact(id, updateContactInput) {
        const contact = await this.contactRepository.findOne(id);
        if (!contact) {
            errorMessage(id);
        }
        const updateContact = Object.assign(Object.assign({}, contact), updateContactInput);
        await this.contactRepository.save(updateContact);
        return updateContact;
    }
    async deleteContact(id) {
        const result = await this.contactRepository.delete(id);
        if (result.affected === 0) {
            errorMessage(id);
        }
        return id;
    }
};
ContactService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(contact_entity_1.Contact)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ContactService);
exports.ContactService = ContactService;
function errorMessage(id) {
    throw new common_1.NotFoundException(`Contact with ID "${id}" not found`);
}
//# sourceMappingURL=contact.service.js.map