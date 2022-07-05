import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Timestamp,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  mainAddress: string

  @Column()
  birthday: Date

  @CreateDateColumn()
  readonly createdAt: Timestamp

  @UpdateDateColumn()
  readonly updatedAt?: Timestamp
  constructor(id: number, name: string, mainAddress: string) {
    this.id = id
    this.name = name
    this.mainAddress = mainAddress
  }
}
