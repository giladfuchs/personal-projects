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
exports.PhoneNumberService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const phoneNumber_entity_1 = require("./phoneNumber.entity");
let PhoneNumberService = class PhoneNumberService {
    constructor(phoneNumberRepository) {
        this.phoneNumberRepository = phoneNumberRepository;
    }
    async createPhoneNumberInput(createPhoneNumberInput, userId) {
        const phoneNumber = this.phoneNumberRepository.create(Object.assign({}, createPhoneNumberInput));
        phoneNumber.user = { id: userId };
        return this.phoneNumberRepository.save(phoneNumber);
    }
    async updatePhoneNumber(id, updatePhoneNumberInput) {
        const phoneNumber = await this.phoneNumberRepository.findOne(id);
        if (!phoneNumber) {
            errorMessage(id);
        }
        const updatePhoneNumber = Object.assign(Object.assign({}, phoneNumber), updatePhoneNumberInput);
        await this.phoneNumberRepository.save(updatePhoneNumber);
        return updatePhoneNumber;
    }
    async deletePhoneNumber(id) {
        const result = await this.phoneNumberRepository.delete(id);
        if (result.affected === 0) {
            errorMessage(id);
        }
        return id;
    }
};
PhoneNumberService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(phoneNumber_entity_1.PhoneNumber)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhoneNumberService);
exports.PhoneNumberService = PhoneNumberService;
function errorMessage(id) {
    throw new common_1.NotFoundException(`Contact with ID "${id}" not found`);
}
//# sourceMappingURL=photoNumber.service.js.map