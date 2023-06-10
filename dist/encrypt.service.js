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
exports.EncryptService = void 0;
const common_1 = require("../../@nestjs/common");
const enum_1 = require("./common/enum");
const crypto_js_1 = require("crypto-js");
const Crypto = require("crypto-js");
let EncryptService = class EncryptService {
    constructor(private_key) {
        this.private_key = private_key;
        this.private_key = private_key;
    }
    decrypt(data, type) {
        switch (type) {
            case enum_1.Algorithm.AES:
                return crypto_js_1.AES.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case enum_1.Algorithm.DES:
                return crypto_js_1.DES.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case enum_1.Algorithm.Rabbit:
                return crypto_js_1.Rabbit.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case enum_1.Algorithm.RC4:
                return crypto_js_1.RC4.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case enum_1.Algorithm.RC4Drop:
                return crypto_js_1.RC4Drop.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            default:
                return 'The input algorithm cannot be decrypted!!';
        }
    }
};
EncryptService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('ENCRYPT_OPTIONS')),
    __metadata("design:paramtypes", [String])
], EncryptService);
exports.EncryptService = EncryptService;
//# sourceMappingURL=encrypt.service.js.map