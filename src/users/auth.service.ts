import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "./users.service";
import { randomBytes, scrypt as _script} from "crypto";
import { promisify } from 'util';

const script = promisify(_script);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService){}

    async signUp(email: string, password: string) {
        //See if email is in use
        const user = await this.userService.find(email);
        if(user.length){
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
        

        // return user
  
    }

    signIn(){

    }

}