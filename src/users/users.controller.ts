import { Controller, Get, Post, Delete, Put, Body,Inject } from '@nestjs/common';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {

    constructor(private usersService: UsersService){

    }

    @Post('/signup')
    createUser(@Body()body : CreateUserDTO) {
        console.log('body',body);
        this.usersService.create(body.email,body.password);
    }


}
