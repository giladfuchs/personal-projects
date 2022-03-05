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
exports.PhotoType = void 0;
const graphql_1 = require("@nestjs/graphql");
let PhotoType = class PhotoType {
};
__decorate([
    graphql_1.Field((type) => graphql_1.ID),
    __metadata("design:type", Number)
], PhotoType.prototype, "id", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", String)
], PhotoType.prototype, "imgUrl", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], PhotoType.prototype, "blur", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], PhotoType.prototype, "gray", void 0);
__decorate([
    graphql_1.Field(),
    __metadata("design:type", Boolean)
], PhotoType.prototype, "saturation", void 0);
PhotoType = __decorate([
    graphql_1.ObjectType('Photo'),
    graphql_1.InputType('InputPhoto')
], PhotoType);
exports.PhotoType = PhotoType;
//# sourceMappingURL=photo.type.js.map