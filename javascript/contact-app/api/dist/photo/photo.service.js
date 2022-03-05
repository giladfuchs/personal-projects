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
exports.PhotoService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const photo_entity_1 = require("./photo.entity");
let PhotoService = class PhotoService {
    constructor(photoRepository) {
        this.photoRepository = photoRepository;
    }
    async createPhoto(userId, createPhoneNumberInput) {
        const photo = this.photoRepository.create(Object.assign({}, createPhoneNumberInput));
        photo.user = { id: userId };
        try {
            await this.photoRepository.save(photo);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.detail);
        }
        return photo;
    }
    async updatePhoto(photoId, updatePhotoInput) {
        const photo = await this.photoRepository.findOne(photoId);
        if (!photo) {
            errorMessage(photoId);
        }
        const updatePhoto = Object.assign(Object.assign({}, photo), updatePhotoInput);
        await this.photoRepository.save(updatePhoto);
        return updatePhoto;
    }
    async deletePhoto(id) {
        const result = await this.photoRepository.delete(id);
        if (result.affected === 0) {
            errorMessage(id);
        }
        return id;
    }
};
PhotoService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(photo_entity_1.Photo)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PhotoService);
exports.PhotoService = PhotoService;
function errorMessage(id) {
    throw new common_1.NotFoundException(`Photo with ID "${id}" not found`);
}
//# sourceMappingURL=photo.service.js.map