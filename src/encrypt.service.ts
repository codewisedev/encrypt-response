import { Inject, Injectable } from '../../@nestjs/common'
import { Algorithm } from './common/enum'
import {
    AES,
    DES,
    RC4,
    RC4Drop,
    Rabbit,
} from 'crypto-js'
import * as Crypto from 'crypto-js';

@Injectable()
export class EncryptService {
    public type: Algorithm

    constructor(
        @Inject('ENCRYPT_OPTIONS') public private_key: string,
    ) {
        this.private_key = private_key
    }

    /**
     * This function decrypts data using various algorithms based on the input type.
     * @param {any} data - The encrypted data that needs to be decrypted.
     * @param {Algorithm} type - Algorithm - an enum that represents the type of encryption algorithm
     * used to encrypt the data.
     * @returns The method `decrypt` returns the decrypted data as a string if the input algorithm is
     * supported, otherwise it returns the string `'The input algorithm cannot be decrypted!!'`.
     */
    decrypt(data: any, type: Algorithm): any {
        switch (type) {
            case Algorithm.AES:
                return AES.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case Algorithm.DES:
                return DES.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case Algorithm.Rabbit:
                return Rabbit.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case Algorithm.RC4:
                return RC4.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            case Algorithm.RC4Drop:
                return RC4Drop.decrypt(data, this.private_key).toString(Crypto.enc.Utf8);
            default:
                return 'The input algorithm cannot be decrypted!!'
        }
    }
}
