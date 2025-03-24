import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){
        console.log('TypeOrmConfigService.constructor')
    }

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {

        console.log('TypeOrmConfigService.createTypeOrmOptions')
        return {
            type: 'sqlite',
            synchronize: false,
            database: this.configService.get<string>('DB_NAME'),
            autoLoadEntities: true
        }
    }
}