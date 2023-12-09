import { Request, Response } from 'express';
import { InvoiceService } from '../services/invoice.service';

export class InvoiceController {
  static async create(req: Request, res: Response) {
    try {
      const newInvoice = await InvoiceService.createInvoice(req.body);
      res.status(201).json(newInvoice);
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
