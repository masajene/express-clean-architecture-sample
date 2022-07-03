import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm'

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

  @CreateDateColumn({ type: 'timestamp', precision: 0 })
  createdAt: Date

  @CreateDateColumn({ type: 'timestamp', precision: 0 })
  updatedAt: Date
}
