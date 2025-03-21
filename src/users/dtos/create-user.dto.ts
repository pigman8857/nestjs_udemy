import { IsString, IsEmail } from 'class-validator';

export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}



export class SignInDTO extends CreateUserDTO{
    
}