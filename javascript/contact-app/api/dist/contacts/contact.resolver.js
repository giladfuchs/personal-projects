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
exports.ConactResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const contact_type_1 = require("./contact.type");
const contact_service_1 = require("./contact.service");
const contact_input_1 = require("./contact.input");
let ConactResolver = class ConactResolver {
    constructor(contactService) {
        this.contactService = contactService;
    }
    contacts(filterValue, skip, limit, date) {
        return this.contactService.getContacts(filterValue, skip, limit);
    }
    createContact(createContactInput) {
        return this.contactService.createContact(createContactInput);
    }
    updateContact(id, updateContactInput) {
        return this.contactService.updateContact(id, updateContactInput);
    }
    deleteContact(id) {
        return this.contactService.deleteContact(id);
    }
};
__decorate([
    graphql_1.Query((returns) => [contact_type_1.ContactType]),
    __param(0, graphql_1.Args('filterValue')),
    __param(1, graphql_1.Args('skip')),
    __param(2, graphql_1.Args('limit')),
    __param(3, graphql_1.Args('date')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number, String]),
    __metadata("design:returntype", void 0)
], ConactResolver.prototype, "contacts", null);
__decorate([
    graphql_1.Mutation((returns) => contact_type_1.ContactType),
    __param(0, graphql_1.Args('CreateContactInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [contact_input_1.CreateContactInput]),
    __metadata("design:returntype", void 0)
], ConactResolver.prototype, "createContact", null);
__decorate([
    graphql_1.Mutation((returns) => contact_type_1.ContactType),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args('UpdateContactInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, contact_input_1.UpdateContactInput]),
    __metadata("design:returntype", void 0)
], ConactResolver.prototype, "updateContact", null);
__decorate([
    graphql_1.Mutation((returns) => Number),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ConactResolver.prototype, "deleteContact", null);
ConactResolver = __decorate([
    graphql_1.Resolver((of) => contact_type_1.ContactType),
    __metadata("design:paramtypes", [contact_service_1.ContactService])
], ConactResolver);
exports.ConactResolver = ConactResolver;
//# sourceMappingURL=contact.resolver.js.map