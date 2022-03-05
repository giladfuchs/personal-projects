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
exports.PhotoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const photo_type_1 = require("./photo.type");
const photo_service_1 = require("./photo.service");
const photo_input_1 = require("./photo.input");
let PhotoResolver = class PhotoResolver {
    constructor(photoService) {
        this.photoService = photoService;
    }
    createPhoto(id, CreatePhotoInput) {
        return this.photoService.createPhoto(id, CreatePhotoInput);
    }
    updatePhoto(id, UpdatePhotoInput) {
        return this.photoService.updatePhoto(id, UpdatePhotoInput);
    }
    deletePhoto(id) {
        return this.photoService.deletePhoto(id);
    }
};
__decorate([
    graphql_1.Mutation((returns) => photo_type_1.PhotoType),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args('Photo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, photo_input_1.CreatePhotoInput]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "createPhoto", null);
__decorate([
    graphql_1.Mutation((returns) => photo_type_1.PhotoType),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args('Photo')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, photo_input_1.CreatePhotoInput]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "updatePhoto", null);
__decorate([
    graphql_1.Mutation((returns) => Number),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PhotoResolver.prototype, "deletePhoto", null);
PhotoResolver = __decorate([
    graphql_1.Resolver((of) => photo_type_1.PhotoType),
    __metadata("design:paramtypes", [photo_service_1.PhotoService])
], PhotoResolver);
exports.PhotoResolver = PhotoResolver;
//# sourceMappingURL=photo.resolver.js.map