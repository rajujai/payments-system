import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/Invoice';

export class InvoiceController {
  static async create(req: Request, res: Response) {
    try {
      const {receiverEmail, amount, dueDate} = req.body;
      const newInvoice = await InvoiceService.createInvoice(receiverEmail, amount, dueDate);
      res.status(201).json(newInvoice);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const invoices = await InvoiceService.fetchInvoices();
      res.status(200).json(invoices);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const invoice = await InvoiceService.fetchInvoiceById(req.params.id);
      if (!invoice) {
        return res.status(404).json({ error: `Invoice not found with id: ${req.body.id}` });
      }
      res.status(200).json(invoice);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updatedInvoice = await InvoiceService.updateInvoice(req.body);
      if (!updatedInvoice) {
        return res.status(404).json({ error: `Invoice not found with id: ${req.body.id}` });
      }
      res.status(200).json(updatedInvoice);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deletedInvoice = await InvoiceService.deleteInvoiceById(req.params.id);
      if (!deletedInvoice) {
        return res.status(404).json({ error: `Invoice not found with id: ${req.body.id}` });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
