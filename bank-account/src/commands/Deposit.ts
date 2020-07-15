import { Register, UUID } from '@boostercloud/framework-types'
import { DepositPerformed } from '../events/DepositPerformed'
import { Command } from '@boostercloud/framework-core'
import { Banker, Client } from '../Roles'

@Command({
  authorize: [Client, Banker],
})
export class Deposit {
  constructor(readonly iban: UUID, readonly amount: number) {}

  public async handle(register: Register): Promise<void> {
    register.events(new DepositPerformed(this.iban, this.amount))
  }
}
