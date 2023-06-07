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
const common_1 = require("@nestjs/common");
const crypto_js_1 = require("crypto-js");
const rxjs_1 = require("rxjs");
const core_1 = require("@nestjs/core");
const constant_1 = require("./common/constant");
let EncryptInterceptor = class EncryptInterceptor {
    constructor(private_key, reflector) {
        this.private_key = private_key;
        this.reflector = reflector;
        this.private_key = private_key;
    }
    intercept(context, next) {
        var _a;
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const method = req.method;
        const url = req.url;
        console.log(`Method: ${method}, URL: ${url}`);
        const type = (_a = this.reflector.get(constant_1.algorithmKey, context.getHandler())) !== null && _a !== void 0 ? _a : '';
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (res.statusCode === common_1.HttpStatus.OK &&
                data !== undefined &&
                data !== null) {
                const encryptedData = crypto_js_1.default.AES.encrypt(data, this.private_key).toString();
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
//# sourceMappingURL=encrypt.interceptor.js.map