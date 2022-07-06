import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { DBProvider } from '../../adapter/provider/db_provider'
import * as dotenv from 'dotenv'
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'

export class MySQLDataSource implements DBProvider {
  datasource(): DataSource {
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
      entities: [__dirname + '/../../entity/**/*.ts'],
      migrationsTableName: 'migrations',
      migrations: [__dirname + '/migrations/*.ts'],
      subscribers: [],
    }
    console.log(ormConfig)
    return new DataSource(ormConfig)
  }
}
