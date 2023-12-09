import { Invoice } from '../models/Invoice';
import { UserService } from './user.service';
import { InvoiceRepository } from '../repositories/repos';

export class InvoiceService {
  static async createInvoice(receiverEmail: string, amount: number, dueDate: Date): Promise<Invoice> {
    const receiver = await UserService.fetchUserByEmail(receiverEmail);
    if (!receiver) throw new Error(`No user registered with email: ${receiverEmail}`);
    const invoice = InvoiceRepository.create(new Invoice(receiver, amount, dueDate));
    return await InvoiceRepository.save(invoice);
  }

  static async fetchInvoices(): Promise<Invoice[]> {
    return await InvoiceRepository.find();
  }

  static async fetchInvoiceById(invoiceId: string): Promise<Invoice | null> {
    return await InvoiceRepository.findOneBy({ id: invoiceId });
  }


  static async updateInvoice(updatedInvoiceData: Partial<Invoice>): Promise<Invoice | null> {
    const existingInvoice = await InvoiceRepository.findOneBy({ id: updatedInvoiceData.id });
    if (!existingInvoice) return null;
    const updatedInvoice = InvoiceRepository.merge(existingInvoice, updatedInvoiceData);
    return await InvoiceRepository.save(updatedInvoice);
  }


  static async deleteInvoiceById(invoiceId: string): Promise<Invoice | null> {
    const existingInvoice = await InvoiceRepository.findOneBy({ id: invoiceId });
    if (!existingInvoice) return null;
    await InvoiceRepository.remove(existingInvoice);
    return existingInvoice;
  }
}
