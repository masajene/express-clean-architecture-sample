import 'reflect-metadata'
import { DataSource } from 'typeorm'
import ormConfig from './ormconfig'

export const MySQLDataSource = new DataSource(ormConfig)
