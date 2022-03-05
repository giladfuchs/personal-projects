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
exports.Contact = void 0;
const phoneNumber_entity_1 = require("../phoneNumber/phoneNumber.entity");
const photo_entity_1 = require("../photo/photo.entity");
const typeorm_1 = require("typeorm");
let Contact = class Contact {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Contact.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Contact.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column({ nullable: false }),
    __metadata("design:type", String)
], Contact.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "nickName", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Contact.prototype, "address", void 0);
__decorate([
    typeorm_1.OneToMany((type) => phoneNumber_entity_1.PhoneNumber, (phoneEntity) => phoneEntity.user, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], Contact.prototype, "phoneNumbers", void 0);
__decorate([
    typeorm_1.OneToOne((type) => photo_entity_1.Photo, (phoneEntity) => phoneEntity.user, {
        cascade: ['insert', 'update'],
        onDelete: 'CASCADE',
        eager: true,
    }),
    __metadata("design:type", photo_entity_1.Photo)
], Contact.prototype, "photo", void 0);
Contact = __decorate([
    typeorm_1.Entity()
], Contact);
exports.Contact = Contact;
//# sourceMappingURL=contact.entity.js.map