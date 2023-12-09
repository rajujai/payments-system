import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './User';
import { InvoiceStatus } from '../enums/InvoiceStatus';

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.receivedInvoices)
  receiver: User;

  @Column()
  amount: number;

  @Column()
  status: InvoiceStatus;

  @Column()
  dueDate: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor(receiver: User, amount: number, dueDate: Date){
    this.receiver = receiver;
    this.amount = amount;
    this.dueDate = dueDate;
    this.status = InvoiceStatus.GENERATED;
  }
}
