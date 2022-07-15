import { Account } from "@prisma/client"
import { AccountRepository } from "../../domain/repository/account_repository"
import { DBProvider } from "../provider/db_provider"

export class AccountRepositoryImpl implements AccountRepository {
    private readonly db: DBProvider

    constructor(db: DBProvider) {
        this.db = db
    }

    async findWithMail(email: string): Promise<Account> {
        return this.db.datasource().account.findUnique({ where: { email } })
    }

    async create(account: Account): Promise<Account> {
        return this.db.datasource().account.create({
            data: {
                email: account.email,
                password: account.password,
                createdAt: account.createdAt
            }
        })
    }

    async findAll(): Promise<Account[]> {
        return this.db.datasource().account.findMany()
    }
}