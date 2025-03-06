import {
    NestInterceptor,
    Injectable,
    ExecutionContext,
    CallHandler
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService){}

    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
        //console.log('CurrentUserInterceptor() comming in')
        const request = context.switchToHttp().getRequest();
        const { userID : userId } = request.session || {} as { userID : number};

        if(userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        return next.handle();
    }

}