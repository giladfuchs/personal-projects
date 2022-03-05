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
exports.UpdateContactInput = exports.CreateContactInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const phoneNumber_input_1 = require("../phoneNumber/phoneNumber.input");
const photo_input_1 = require("../photo/photo.input");
let CreateContactInput = class CreateContactInput {
};
__decorate([
    class_validator_1.MinLength(1),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateContactInput.prototype, "firstName", void 0);
__decorate([
    class_validator_1.MinLength(1),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreateContactInput.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateContactInput.prototype, "nickName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], CreateContactInput.prototype, "address", void 0);
__decorate([
    class_validator_1.IsArray(),
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined(),
    class_transformer_1.Type((type) => phoneNumber_input_1.CreatePhoneNumberInput),
    graphql_1.Field((type) => [phoneNumber_input_1.CreatePhoneNumberInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateContactInput.prototype, "phoneNumbers", void 0);
__decorate([
    class_validator_1.IsOptional(),
    class_validator_1.ValidateNested(),
    class_validator_1.IsDefined(),
    class_transformer_1.Type((type) => photo_input_1.CreatePhotoInput),
    graphql_1.Field((type) => photo_input_1.CreatePhotoInput, { nullable: true }),
    __metadata("design:type", photo_input_1.CreatePhotoInput)
], CreateContactInput.prototype, "photo", void 0);
CreateContactInput = __decorate([
    graphql_1.InputType()
], CreateContactInput);
exports.CreateContactInput = CreateContactInput;
let UpdateContactInput = class UpdateContactInput {
};
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateContactInput.prototype, "firstName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateContactInput.prototype, "lastName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateContactInput.prototype, "nickName", void 0);
__decorate([
    class_validator_1.IsOptional(),
    graphql_1.Field({ nullable: true }),
    __metadata("design:type", String)
], UpdateContactInput.prototype, "address", void 0);
UpdateContactInput = __decorate([
    graphql_1.InputType()
], UpdateContactInput);
exports.UpdateContactInput = UpdateContactInput;
//# sourceMappingURL=contact.input.js.map