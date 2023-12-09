import { getRepository } from 'typeorm';
import { Transaction } from '../models/Transaction';

export class TransactionService {
  static async createTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    const transactionRepository = getRepository(Transaction);
    const transaction = transactionRepository.create(transactionData);
    return await transactionRepository.save(transaction);
  }

  static async fetchAll(): Promise<Transaction[] | null> {
    const transactionRepository = getRepository(Transaction);
    return await transactionRepository.find();
  }

  static async fetchTransactionById(transactionId: string): Promise<Transaction | null> {
    const transactionRepository = getRepository(Transaction);
    return await transactionRepository.findOneBy({ id: transactionId });
  }


  static async updateTransaction(updatedTransactionData: Partial<Transaction>): Promise<Transaction | null> {
    const transactionRepository = getRepository(Transaction);
    const existingTransaction = await transactionRepository.findOneBy({ id: updatedTransactionData.id });
    if (!existingTransaction) return null;
    const updatedTransaction = transactionRepository.merge(existingTransaction, updatedTransactionData);
    return await transactionRepository.save(updatedTransaction);
  }


  static async deleteTransactionById(transactionId: string): Promise<Transaction | null> {
    const transactionRepository = getRepository(Transaction);
    const existingTransaction = await transactionRepository.findOneBy({ id: transactionId });
    if (!existingTransaction) return null;
    await transactionRepository.remove(existingTransaction);
    return existingTransaction;
  }
}
