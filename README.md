# encrypt-response

NestJs library for encrypt response.

## Node.js (Install)

Requirements:

- Nest.js
- npm (Node.js package manager)

```bash
npm install encrypt-response
```

### Usage

Import EncryptModule to your current module and pass your private_key:
```javascript
import { EncryptModule } from 'encrypt-response';

@Module({
  imports: [EncryptModule.register('private_key')]
})
```

Import Encrypt decorator and EncryptInterceptor to your current controller and pass your algorithm from Algorithm enums:
```javascript
import { Encrypt, EncryptInterceptor } from 'encrypt-response';
import { Algorithm } from 'encrypt-response/dist/common/enum';

@Get()
  @Encrypt(Algorithm.AES)
  @UseInterceptors(EncryptInterceptor)
  getHello(): any {
    return this.appService.getHello();
  }
```

If you need decrypt cipher text in your back-end project, you can use EncryptService:
```javascript
import { EncryptService } from 'encrypt-response';
import { Algorithm } from 'encrypt-response/dist/common/enum';

constructor(
    private readonly encryptService: EncryptService,
  ) {}
  
  decrypt(): any {
    console.log(
      this.encryptService.decrypt(
        'U2FsdGVkX18bd5ZxKAzmHipM9l+gowyOSLcudi6EOWM=',
        Algorithm.AES,
      ),
    );
  }
```

### List of crypto algorithms

- ```MD5```
- ```SHA1```
- ```SHA3```
- ```SHA256```
- ```SHA512```
- ```RIPEMD160```
- ```HmacMD5```
- ```HmacSHA1```
- ```HmacSHA256```
- ```HmacSHA512```
- ```AES```
- ```DES```
- ```Rabbit```
- ```RC4```
- ```RC4Drop```

## Release notes

### 0.0.3
The `0.0.x` are based on the original EncryptResponse.
