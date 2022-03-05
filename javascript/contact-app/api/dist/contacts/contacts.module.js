"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const contact_entity_1 = require("./contact.entity");
const contact_service_1 = require("./contact.service");
const contact_resolver_1 = require("./contact.resolver");
let ContactsModule = class ContactsModule {
};
ContactsModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([contact_entity_1.Contact])],
        providers: [contact_resolver_1.ConactResolver, contact_service_1.ContactService],
        exports: [contact_service_1.ContactService],
    })
], ContactsModule);
exports.ContactsModule = ContactsModule;
//# sourceMappingURL=contacts.module.js.map