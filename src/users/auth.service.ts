import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _script} from "crypto";
import { promisify } from 'util';

const script = promisify(_script);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    async signUp(email: string, password: string) {
        //See if email is in use
        const users = await this.userService.find(email);
        if(users.length){
            throw new BadRequestException;
        }

        // Hash the users password
        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        // hash the salt and the password together
        const hash = (await script(password,salt,32)) as Buffer;

        // Join the hashed result and the salt together
        const result = salt + '.' + hash.toString('hex');

        // Create a new user and save it
        const user = await this.userService.create(email, result);


        // return user
        return user;
    }

    async signIn(email:string, password:string){
        const [user] = await this.userService.find(email);
        if(!user){
            throw new NotFoundException('User not found');  

        }

        const [salt,storedHash] = user.password.split('.');

        const hash = (await script(password,salt,32)) as Buffer;

        if(storedHash !== hash.toString('hex')){
            throw new BadRequestException('bad password')
        } 

        return user;
    }

}