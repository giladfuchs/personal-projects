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
exports.PhoneNumber2 = void 0;
const graphql_1 = require("@nestjs/graphql");
const contact_entity_1 = require("./contact.entity");
const typeorm_1 = require("typeorm");
let PhoneNumber2 = class PhoneNumber2 {
};
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PhoneNumber2.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PhoneNumber2.prototype, "type", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PhoneNumber2.prototype, "numericNumber", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PhoneNumber2.prototype, "userId", void 0);
PhoneNumber2 = __decorate([
    typeorm_1.Entity('PhoneNumber2'),
    graphql_1.ObjectType('PhoneNumber2')
], PhoneNumber2);
exports.PhoneNumber2 = PhoneNumber2;
//# sourceMappingURL=phoneNumber.entity.js.map