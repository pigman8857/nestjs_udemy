import { Controller, Get, Post, Delete, Put, Body, Param, Query, NotFoundException, UseInterceptors, ClassSerializerInterceptor } from '@nestjs/common';
import { CreateUserDTO, SignInDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
import { UsersService } from './users.service';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDTO } from './dtos/user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDTO)
export class UsersController {

    constructor(
        private usersService: UsersService, 
        private authService: AuthService){

    }

    @Post('/signup')
    createUser(@Body()body : CreateUserDTO) {
        console.log('signup body',body);
        return this.authService.signUp(body.email,body.password);
    }

    @Post('/signin')
    signIn(@Body()body : SignInDTO) {
        console.log('signin body',body);
        return this.authService.signIn(body.email,body.password);
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
