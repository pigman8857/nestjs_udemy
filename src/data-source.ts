import { DataSource, DataSourceOptions } from "typeorm";

console.log('data-source.ts')

export const appDataSource = new DataSource({
    type: 'sqlite',
    database: 'db.sqlite',
    entities: ['**/*.entity.ts'],
    migrations: [__dirname + '/migrations/*.ts']
} as DataSourceOptions)