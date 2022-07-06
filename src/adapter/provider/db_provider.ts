import { DataSource } from 'typeorm'

export interface DBProvider {
  datasource(): DataSource
}
