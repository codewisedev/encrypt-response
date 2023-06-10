import { Algorithm } from './common/enum';
export declare class EncryptService {
    private_key: string;
    type: Algorithm;
    constructor(private_key: string);
    decrypt(data: any, type: Algorithm): any;
}
