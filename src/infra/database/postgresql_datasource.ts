import { PrismaClient } from '@prisma/client'
import { injectable } from 'inversify'
import { DBProvider } from '../../adapter/provider/db_provider'

@injectable()
export class PostgreSQLDataSource implements DBProvider {
  datasource = (): PrismaClient => new PrismaClient()
}
