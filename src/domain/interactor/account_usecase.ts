import { AccountViewModel } from "../model/account_view_model"
import { AccountRepository } from "../repository/account_repository"
import { AccountUseCase } from "../usecase/account_usecase"

export class AccountUseCaseImpl implements AccountUseCase {
    private repository: AccountRepository

    constructor(repository: AccountRepository) {
        this.repository = repository
    }

    async accounts(): Promise<AccountViewModel[]> {
        const entity = await this.repository.findAll()
        return entity.map(
            (v) => new AccountViewModel(v.id, v.email, v.password)
        )
    }

    async accountWithEmail(mail: string): Promise<AccountViewModel> {
        const entity = await this.repository.findWithMail(mail)
        return new AccountViewModel(
            entity.id,
            entity.email,
            entity.password
        )
    }

    async createAccount(account: AccountViewModel): Promise<boolean> {
        const res = await this.repository.create({
            id: account.id,
            email: account.email,
            password: account.password,
            createdAt: new Date()
        })
        return res != null
    }
}