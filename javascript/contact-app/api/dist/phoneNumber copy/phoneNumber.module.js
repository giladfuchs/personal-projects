"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PhoneNumberModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const phoneNumber_entity_1 = require("./phoneNumber.entity");
const phoneNumber_service_1 = require("./phoneNumber.service");
const phoneNumber_resolver_1 = require("./phoneNumber.resolver");
let PhoneNumberModule = class PhoneNumberModule {
};
PhoneNumberModule = __decorate([
    common_1.Module({
        imports: [typeorm_1.TypeOrmModule.forFeature([phoneNumber_entity_1.PhoneNumber])],
        providers: [phoneNumber_resolver_1.PhoneNumberResolver, phoneNumber_service_1.PhoneNumberService],
    })
], PhoneNumberModule);
exports.PhoneNumberModule = PhoneNumberModule;
//# sourceMappingURL=phoneNumber.module.js.map