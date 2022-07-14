import 'reflect-metadata'
import { DataSource } from 'typeorm'
import * as dotenv from 'dotenv'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import { injectable } from 'inversify'
import { DBProvider } from '../../adapter/provider/db_provider'

@injectable()
export class MySQLDataSource implements DBProvider {
  datasource = (): DataSource => {
    dotenv.config()

    const ormConfig: MysqlConnectionOptions = {
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true,
      logging: false,
      entities: [`${__dirname}/../../entity/**/*.ts`],
      migrationsTableName: 'migrations',
      migrations: [`${__dirname}/migrations/*.ts`],
      subscribers: [],
    }
    return new DataSource(ormConfig)
  }
}
