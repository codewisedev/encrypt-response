import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
  HttpStatus
} from '../../@nestjs/common'
import {
  AES,
  DES,
  HmacMD5,
  HmacSHA1,
  HmacSHA256,
  HmacSHA512,
  MD5,
  RC4,
  RC4Drop,
  RIPEMD160,
  Rabbit,
  SHA1,
  SHA256,
  SHA3,
  SHA512
} from 'crypto-js'
import * as Crypto from 'crypto-js'
import { Response } from '../../express'
import { Observable, map } from '../../rxjs'
import { Reflector } from '../../@nestjs/core'
import { algorithmKey } from './common/constant'
import { Algorithm } from './common/enum'

/* This is a NestJS interceptor class that encrypts data using a specified algorithm and private key. */
export class EncryptInterceptor implements NestInterceptor {
  constructor(
    @Inject('ENCRYPT_OPTIONS') public private_key: string,
    @Inject(Reflector.name) private readonly reflector: Reflector
  ) {
    this.private_key = private_key
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // const req = context.switchToHttp().getRequest()
    const res: Response = context.switchToHttp().getResponse()

    // for future *_*
    // const method = req.method
    // const url = req.url

    const type = this.reflector.get<Algorithm>(
      algorithmKey,
      context.getHandler()
    )

    return next.handle().pipe(
      map((data) => {
        if (
          res.statusCode === HttpStatus.OK &&
          data !== undefined &&
          data !== null
        ) {
          const encryptedData = encryptData(data, type, this.private_key)

          return encryptedData
        } else return data
      })
    )
  }
}

/**
 * The function encrypts data using various algorithms based on the specified type and private key.
 * @param {any} data - The data that needs to be encrypted.
 * @param {Algorithm} type - Algorithm - an enum that specifies the type of encryption algorithm to
 * use.
 * @param {string} privateKey - The private key is a secret key used in symmetric encryption algorithms
 * like AES, DES, Rabbit, RC4, and RC4Drop. It is used to encrypt and decrypt data.
 * @returns an encrypted version of the input data using the specified encryption algorithm and private
 * key. The type of encryption algorithm used is determined by the "type" parameter, which is an enum
 * value of the "Algorithm" type. The specific encryption method used depends on the value of the
 * "type" parameter, and can be any of the following: MD5, SHA1, SHA3, SHA
 */
function encryptData(data: any, type: Algorithm, privateKey: string): any {
  switch (type) {
    case Algorithm.MD5:
      return MD5(JSON.stringify(data)).toString()
    case Algorithm.SHA1:
      return SHA1(JSON.stringify(data)).toString()
    case Algorithm.SHA3:
      return SHA3(JSON.stringify(data), { outputLength: 512 }).toString()
    case Algorithm.SHA256:
      return SHA256(JSON.stringify(data)).toString(Crypto.enc.Base64)
    case Algorithm.SHA512:
      return SHA512(JSON.stringify(data)).toString(Crypto.enc.Base64)
    case Algorithm.RIPEMD160:
      return RIPEMD160(JSON.stringify(data)).toString()
    case Algorithm.HmacMD5:
      return HmacMD5(JSON.stringify(data), privateKey).toString()
    case Algorithm.HmacSHA1:
      return HmacSHA1(JSON.stringify(data), privateKey).toString()
    case Algorithm.HmacSHA256:
      return HmacSHA256(JSON.stringify(data), privateKey).toString()
    case Algorithm.HmacSHA512:
      return HmacSHA512(JSON.stringify(data), privateKey).toString()
    case Algorithm.AES:
      return AES.encrypt(JSON.stringify(data), privateKey).toString()
    case Algorithm.DES:
      return DES.encrypt(JSON.stringify(data), privateKey).toString()
    case Algorithm.Rabbit:
      return Rabbit.encrypt(JSON.stringify(data), privateKey).toString()
    case Algorithm.RC4:
      return RC4.encrypt(JSON.stringify(data), privateKey).toString()
    case Algorithm.RC4Drop:
      return RC4Drop.encrypt(JSON.stringify(data), privateKey).toString()
  }
}
