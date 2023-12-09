import { Request, Response } from 'express';
import { TransactionService } from '../services/transaction.service';

export class TransactionController {
  static async create(req: Request, res: Response) {
    try {
      const newTransaction = await TransactionService.createTransaction(req.body);
      res.status(201).json(newTransaction);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const transactions = await TransactionService.fetchAll();
      res.status(200).json(transactions);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const transaction = await TransactionService.fetchTransactionById(req.params.id);
      if (!transaction) {
        return res.status(404).json({ error: `Transaction not found with id: ${req.body.id}` });
      }
      res.status(200).json(transaction);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updatedTransaction = await TransactionService.updateTransaction(req.body);
      if (!updatedTransaction) {
        return res.status(404).json({ error: `Transaction not found with id: ${req.body.id}` });
      }
      res.status(200).json(updatedTransaction);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deletedTransaction = await TransactionService.deleteTransactionById(req.params.id);
      if (!deletedTransaction) {
        return res.status(404).json({ error: `Transaction not found with id: ${req.body.id}` });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
