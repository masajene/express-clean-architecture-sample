import { PrismaClient } from '@prisma/client'

export interface DBProvider {
  datasource(): PrismaClient
}
