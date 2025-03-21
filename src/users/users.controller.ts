import { 
    Controller, 
    Get, 
    Post, 
    Delete, 
    Put, 
    Body, 
    Param, 
    Query, 
    NotFoundException, 
    Session,
    UseGuards
} from '@nestjs/common';
import { CreateUserDTO, SignInDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {

    constructor(
        private usersService: UsersService, 
        private authService: AuthService){

    }

    // @Get('/colors/:color')
    // setColor(@Param('color')color: string, @Session()session: any){
    //     console.log('setColor ',color);
    //     session.color = color;
    // }


    // @Get('/colors')
    // getColor(@Session()session: any){
    //     console.log('getColor ',session);
    //     return session.color;
    // }

    // @Get('/whoami')
    // whoAmI(@Session()session: any){
    //     return this.usersService.findOne(session.userID);
    // }

    // @Get('/whoami')
    // whoAmI(@Request() request: Request){
    //     console.log('whoAmI with CurrentUser ',request.currentUser);
    //      return user;
    // }


    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@CurrentUser() user: User){
        //console.log('whoAmI with CurrentUser ',user);
        return user;
    }

    @Post('/signup')
    async createUser(@Body()body : CreateUserDTO, @Session()session: any) {
        console.log('signup body',body);
        const user = await this.authService.signUp(body.email,body.password);
        session.userID = user.id;
        return user;
    }

    @Post('/signin')
    async signIn(@Body()body : SignInDTO,@Session()session: any) {
        console.log('signin body',body);
        const user = await this.authService.signIn(body.email,body.password);
        session.userID = user.id;
        return user;
    }

    @Post('signOut')
    signOut(@Session()session: any){
        console.log('signOut');
        session.userID = null;
    }

    //@UseInterceptors(new SerializeInterceptor(UserDTO))
    //@Serialize(UserDTO)
    @Get('/:id')  
    async findUser(@Param('id' )id: string){
        //console.log('findUser is running, id >>>> ',id);
        const user = await this.usersService.findOne(parseInt(id));
        if(!user){
            throw new NotFoundException('user not found')
        }
        return user;
    }

    @Get('/')
    findAllUsers(@Query('email')email: string){
        console.log('id',email);
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id' )id: string){
        console.log('id',id);
        return this.usersService.remove(parseInt(id));
    }

    @Put('/:id')
    updateUser(@Param('id')id: string,@Body()body : UpdateUserDTO){
        console.log('body',body);
        return this.usersService.update(parseInt(id),body)
    }
}
