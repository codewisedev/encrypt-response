import { EncryptService } from './encrypt.service'
import { DynamicModule, Module } from '../../@nestjs/common'

@Module({})
export class EncryptModule {
  static register(private_key: string): DynamicModule {
    return {
      module: EncryptModule,
      providers: [
        {
          provide: 'ENCRYPT_OPTIONS',
          useValue: private_key
        },
        EncryptService
      ],
      exports: ['ENCRYPT_OPTIONS', EncryptService]
    }
  }
}
