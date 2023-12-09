import { Transaction } from '../models/Transaction';
import { TransactionRepository } from '../repositories/repos';

export class TransactionService {
  static async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transaction = TransactionRepository.create(transactionData);
    return await TransactionRepository.save(transaction);
  }

  static async fetchAll(): Promise<Transaction[] | null> {
    return await TransactionRepository.find();
  }

  static async fetchTransactionById(transactionId: string): Promise<Transaction | null> {
    return await TransactionRepository.findOneBy({ id: transactionId });
  }


  static async updateTransaction(updatedTransactionData: Partial<Transaction>): Promise<Transaction | null> {
    const existingTransaction = await TransactionRepository.findOneBy({ id: updatedTransactionData.id });
    if (!existingTransaction) return null;
    const updatedTransaction = TransactionRepository.merge(existingTransaction, updatedTransactionData);
    return await TransactionRepository.save(updatedTransaction);
  }


  static async deleteTransactionById(transactionId: string): Promise<Transaction | null> {
    const existingTransaction = await TransactionRepository.findOneBy({ id: transactionId });
    if (!existingTransaction) return null;
    await TransactionRepository.remove(existingTransaction);
    return existingTransaction;
  }
}
