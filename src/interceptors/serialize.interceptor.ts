import {
    UseInterceptors,
    NestInterceptor,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToClass } from 'class-transformer'; 

export function Serialize(dto: ClassConstructor<any>) : MethodDecorator & ClassDecorator {
    return UseInterceptors(new SerializeInterceptor(dto))
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: ClassConstructor<any>){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
  
        //Run something before a request is handled 
        //by the request handler
        //console.log('SerializeInterceptor running before the handler. , context >>> ',context);
        return next.handle().pipe(
            map((data: any) => {
                //Run something before the response is sent out
                //console.log('SerializeInterceptor running before response is sent out. , data >>> ',data);

                return plainToClass(this.dto,data, {
                    excludeExtraneousValues: true
                });
            })
        )
    }

}