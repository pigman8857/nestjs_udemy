import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
    constructor(private configService: ConfigService){
        console.log('TypeOrmConfigService.constructor')
    }

    createTypeOrmOptions(connectionName?: string): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {

        return {
            type: this.configService.get<"postgres" | "sqlite">('DB_TYPE'),
            synchronize: this.configService.get<boolean>('SYNCHRONIZE'),
            database: this.configService.get<string>('DB_NAME'),
            migrationsRun: this.configService.get<boolean>('MIGRATIONS_RUN'),
            autoLoadEntities: true
        }
    }
}