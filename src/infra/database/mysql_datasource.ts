import mysql, { Pool } from 'mysql'
import dotenv from 'dotenv'

import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const MySQLDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/domain/entity/*{.js,.ts}'],
  migrations: [],
  subscribers: [],
})
