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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactType = void 0;
const graphql_1 = require("@nestjs/graphql");
const phoneNumber_type_1 = require("../phoneNumber/phoneNumber.type");
const photo_type_1 = require("../photo/photo.type");
let ContactType = class ContactType {
};
__decorate([
    graphql_1.Field((type) => graphql_1.ID),
    __metadata("design:type", Number)
], ContactType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], ContactType.prototype, "firstName", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], ContactType.prototype, "lastName", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "nickName", void 0);
__decorate([
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], ContactType.prototype, "address", void 0);
__decorate([
    graphql_1.Field((type) => [phoneNumber_type_1.PhoneNumberType]),
    __metadata("design:type", Array)
], ContactType.prototype, "phoneNumbers", void 0);
__decorate([
    graphql_1.Field((type) => photo_type_1.PhotoType, { nullable: true }),
    __metadata("design:type", photo_type_1.PhotoType)
], ContactType.prototype, "photo", void 0);
ContactType = __decorate([
    graphql_1.ObjectType('Contact'),
    graphql_1.InputType('ContactInput')
], ContactType);
exports.ContactType = ContactType;
//# sourceMappingURL=contact.type.js.map