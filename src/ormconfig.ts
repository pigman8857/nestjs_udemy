


import { DataSource, DataSourceOptions } from 'typeorm';

const dbConfig = { synchronize: false } as DataSourceOptions;

console.log('ormconfig.ts > env ',process.env.NODE_ENV)

switch(process.env.NODE_ENV){
    case 'development':
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'db.sqlite',
            entities: [__dirname + '**/*.entity{.ts,.js}'], // be sure to add __dirname to avoid jest complain
        });
        break;
    case 'test' : 
        Object.assign(dbConfig, {
            type: 'sqlite',
            database: 'test.sqlite',
            entities: [__dirname + '**/*.entity{.ts,.js}'], // be sure to add __dirname to avoid jest complain
        });
        break;
    case 'production':
        break;
    default:
        throw new Error('unknown environment');
}



export const AppDataSource = new DataSource(dbConfig)