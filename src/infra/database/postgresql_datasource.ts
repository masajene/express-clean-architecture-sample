import { PrismaClient } from '@prisma/client'
import { DBProvider } from '../../adapter/provider/db_provider'

export class PostgreSQLDataSource implements DBProvider {
  datasource = (): PrismaClient => new PrismaClient()
}
