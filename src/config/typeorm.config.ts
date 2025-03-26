import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){
        console.log('TypeOrmConfigService.constructor')
    }

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {


        const type = this.configService.get<"postgres" | "sqlite">('DB_TYPE');
        const synchronize = this.configService.get<boolean>('SYNCHRONIZE');
        const database = this.configService.get<string>('DB_NAME');
        const url = this.configService.get<string | null>('DB_URL');
        const migrationsRun = this.configService.get<boolean>('MIGRATIONS_RUN');

        //heroku
        const ssl = { rejectUnauthorized: false}

        let option: TypeOrmModuleOptions = {};

        const env = process.env.NODE_URL;
        switch(env){
            case 'test':
                option = {
                    type,
                    synchronize,
                    database,
                    migrationsRun,
                    autoLoadEntities: true
                };
                break;
            case 'development':
                option = {
                    type,
                    synchronize,
                    database,
                    migrationsRun,
                    autoLoadEntities: true
                };
                break;
            case 'production':
                option = {
                    type : 'postgres',
                    synchronize,
                    ssl,
                    url,
                    migrationsRun,
                    autoLoadEntities: true
                };
                break;
            default:
                throw new Error('unknown environment');
        }

        return option; 
    }
}