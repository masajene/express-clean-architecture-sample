import { AccountViewModel } from "../model/account_view_model"

export interface AccountUseCase {
    accounts(): Promise<AccountViewModel[]>
    accountWithEmail(email: string): Promise<AccountViewModel>
    createAccount(account: AccountViewModel): Promise<boolean>
}