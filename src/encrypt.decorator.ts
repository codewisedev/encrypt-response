import { SetMetadata } from '@nestjs/common'
import { algorithmKey } from './common/constant'
import { Algorithm } from './common/enum'

export const Encrypt = (algorithm: Algorithm) =>
  SetMetadata(algorithmKey, algorithm)
