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
    async getContactById(id) {
        const found = await this.contactRepository.findOne(id);
        return found;
    }
    async createContact(createContactInput) {
        const contact = this.contactRepository.create(Object.assign({}, createContactInput));
        return this.contactRepository.save(contact);
    }
    async getContacts() {
        const query = this.contactRepository.createQueryBuilder('contact');
        const contacts = await query.getMany();
        return contacts;
    }
    async updateContact(id, createContactInput) {
        const contact = await this.getContactById(id);
        if (!contact) {
            throw new common_1.NotFoundException(`Contact with ID "${id}" not found`);
        }
        const updateContact = Object.assign({ id: contact.id }, createContactInput);
        await this.contactRepository.save(updateContact);
        return updateContact;
    }
    async deleteContact(id) {
        const result = await this.contactRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Contact with ID "${id}" not found`);
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
//# sourceMappingURL=contact.service.js.map