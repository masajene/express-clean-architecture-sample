import { Account } from '@prisma/client'

export interface AccountRepository {
  findAll(): Promise<Account[]>
  findWithMail(email: string): Promise<Account>
  create(account: Account): Promise<Account>
}
