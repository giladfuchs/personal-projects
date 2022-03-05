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
exports.UpdatePhoneNumberInput = exports.CreatePhoneNumberInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreatePhoneNumberInput = class CreatePhoneNumberInput {
};
__decorate([
    class_validator_1.MinLength(4),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreatePhoneNumberInput.prototype, "type", void 0);
__decorate([
    class_validator_1.MinLength(8),
    class_validator_1.IsNumberString(),
    graphql_1.Field(),
    __metadata("design:type", String)
], CreatePhoneNumberInput.prototype, "numericNumber", void 0);
CreatePhoneNumberInput = __decorate([
    graphql_1.InputType()
], CreatePhoneNumberInput);
exports.CreatePhoneNumberInput = CreatePhoneNumberInput;
let UpdatePhoneNumberInput = class UpdatePhoneNumberInput {
};
__decorate([
    class_validator_1.MinLength(4),
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdatePhoneNumberInput.prototype, "type", void 0);
__decorate([
    class_validator_1.MinLength(8),
    class_validator_1.IsNumberString(),
    graphql_1.Field(),
    __metadata("design:type", String)
], UpdatePhoneNumberInput.prototype, "numericNumber", void 0);
UpdatePhoneNumberInput = __decorate([
    graphql_1.InputType()
], UpdatePhoneNumberInput);
exports.UpdatePhoneNumberInput = UpdatePhoneNumberInput;
//# sourceMappingURL=phoneNumber.input.js.map