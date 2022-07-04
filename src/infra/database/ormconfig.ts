import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions'
import * as dotenv from 'dotenv'
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
  entities: [__dirname + '/../../domain/entity/*.ts'],
  migrationsTableName: 'migrations',
  migrations: [__dirname + '/migrations/*.ts'],
  subscribers: [],
}

export default ormConfig
