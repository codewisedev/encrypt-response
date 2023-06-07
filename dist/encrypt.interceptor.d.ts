import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
export declare class EncryptInterceptor implements NestInterceptor {
    private_key: string;
    private readonly reflector;
    constructor(private_key: string, reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
