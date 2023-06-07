import {
  CallHandler,
  ExecutionContext,
  Inject,
  NestInterceptor,
  HttpStatus
} from '@nestjs/common'
import CryptoJS from 'crypto-js'
import { Response } from 'express'
import { Observable, map } from 'rxjs'
import { Reflector } from '@nestjs/core'
import { algorithmKey } from './common/constant'

export class EncryptInterceptor implements NestInterceptor {
  constructor(
    @Inject('ENCRYPT_OPTIONS') public private_key: string,
    @Inject(Reflector.name) private readonly reflector: Reflector
  ) {
    this.private_key = private_key
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest()
    const res: Response = context.switchToHttp().getResponse()

    const method = req.method
    const url = req.url
    console.log(`Method: ${method}, URL: ${url}`)

    const type =
      this.reflector.get<string>(algorithmKey, context.getHandler()) ?? ''

    return next.handle().pipe(
      map((data) => {
        if (
          res.statusCode === HttpStatus.OK &&
          data !== undefined &&
          data !== null
        ) {
          const encryptedData = CryptoJS.AES.encrypt(
            data,
            this.private_key
          ).toString()

          return encryptedData
        } else return data
      })
    )
  }
}
