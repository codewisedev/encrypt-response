"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Encrypt = void 0;
const common_1 = require("@nestjs/common");
const constant_1 = require("./common/constant");
const Encrypt = (algorithm) => (0, common_1.SetMetadata)(constant_1.algorithmKey, algorithm);
exports.Encrypt = Encrypt;
//# sourceMappingURL=encrypt.decorator.js.map