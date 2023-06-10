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
exports.EncryptInterceptor = void 0;
const common_1 = require("../../@nestjs/common");
const crypto_js_1 = require("crypto-js");
const Crypto = require("crypto-js");
const rxjs_1 = require("../../rxjs");
const core_1 = require("../../@nestjs/core");
const constant_1 = require("./common/constant");
const enum_1 = require("./common/enum");
let EncryptInterceptor = class EncryptInterceptor {
    constructor(private_key, reflector) {
        this.private_key = private_key;
        this.reflector = reflector;
        this.private_key = private_key;
    }
    intercept(context, next) {
        const res = context.switchToHttp().getResponse();
        const type = this.reflector.get(constant_1.algorithmKey, context.getHandler());
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (res.statusCode === common_1.HttpStatus.OK &&
                data !== undefined &&
                data !== null) {
                const encryptedData = encryptData(data, type, this.private_key);
                return encryptedData;
            }
            else
                return data;
        }));
    }
};
EncryptInterceptor = __decorate([
    __param(0, (0, common_1.Inject)('ENCRYPT_OPTIONS')),
    __param(1, (0, common_1.Inject)(core_1.Reflector.name)),
    __metadata("design:paramtypes", [String, core_1.Reflector])
], EncryptInterceptor);
exports.EncryptInterceptor = EncryptInterceptor;
function encryptData(data, type, privateKey) {
    switch (type) {
        case enum_1.Algorithm.MD5:
            return (0, crypto_js_1.MD5)(JSON.stringify(data)).toString();
        case enum_1.Algorithm.SHA1:
            return (0, crypto_js_1.SHA1)(JSON.stringify(data)).toString();
        case enum_1.Algorithm.SHA3:
            return (0, crypto_js_1.SHA3)(JSON.stringify(data), { outputLength: 512 }).toString();
        case enum_1.Algorithm.SHA256:
            return (0, crypto_js_1.SHA256)(JSON.stringify(data)).toString(Crypto.enc.Base64);
        case enum_1.Algorithm.SHA512:
            return (0, crypto_js_1.SHA512)(JSON.stringify(data)).toString(Crypto.enc.Base64);
        case enum_1.Algorithm.RIPEMD160:
            return (0, crypto_js_1.RIPEMD160)(JSON.stringify(data)).toString();
        case enum_1.Algorithm.HmacMD5:
            return (0, crypto_js_1.HmacMD5)(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.HmacSHA1:
            return (0, crypto_js_1.HmacSHA1)(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.HmacSHA256:
            return (0, crypto_js_1.HmacSHA256)(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.HmacSHA512:
            return (0, crypto_js_1.HmacSHA512)(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.AES:
            return crypto_js_1.AES.encrypt(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.DES:
            return crypto_js_1.DES.encrypt(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.Rabbit:
            return crypto_js_1.Rabbit.encrypt(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.RC4:
            return crypto_js_1.RC4.encrypt(JSON.stringify(data), privateKey).toString();
        case enum_1.Algorithm.RC4Drop:
            return crypto_js_1.RC4Drop.encrypt(JSON.stringify(data), privateKey).toString();
    }
}
//# sourceMappingURL=encrypt.interceptor.js.map