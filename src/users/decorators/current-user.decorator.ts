
import {
    createParamDecorator,
    ExecutionContext
} from '@nestjs/common';

export const CurrentUser = createParamDecorator (
    (data: never, context: ExecutionContext) => {
        //console.log('CurrentUser decorator()');
        const request = context.switchToHttp().getRequest();
        //console.log('CurrentUser request.session.userID > ',request.session.userID);
       // console.log('CurrentUser request.currentUser > ',request.currentUser);
        return request.currentUser;
    }
);

