"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
let Person = class Person extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Column
], Person.prototype, "name", void 0);
__decorate([
    sequelize_typescript_1.Column
], Person.prototype, "birthday", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => Hobby)
], Person.prototype, "hobbies", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt
], Person.prototype, "creationDate", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt
], Person.prototype, "updatedOn", void 0);
__decorate([
    sequelize_typescript_1.DeletedAt
], Person.prototype, "deletionDate", void 0);
Person = __decorate([
    sequelize_typescript_1.Table
], Person);
exports.Person = Person;
