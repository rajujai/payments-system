import { getRepository } from 'typeorm';
import { Invoice } from '../models/Invoice';

export class InvoiceService {
  static async createInvoice(invoiceData: Partial<Invoice>): Promise<Invoice> {
    const invoiceRepository = getRepository(Invoice);
    const invoice = invoiceRepository.create(invoiceData);
    return await invoiceRepository.save(invoice);
  }


  static async fetchInvoiceById(invoiceId: string): Promise<Invoice | null> {
    const invoiceRepository = getRepository(Invoice);
    return await invoiceRepository.findOneBy({ id: invoiceId });
  }


  static async updateInvoice(updatedInvoiceData: Partial<Invoice>): Promise<Invoice | null> {
    const invoiceRepository = getRepository(Invoice);
    const existingInvoice = await invoiceRepository.findOneBy({ id: updatedInvoiceData.id });
    if (!existingInvoice) return null;
    const updatedInvoice = invoiceRepository.merge(existingInvoice, updatedInvoiceData);
    return await invoiceRepository.save(updatedInvoice);
  }


  static async deleteInvoiceById(invoiceId: string): Promise<Invoice | null> {
    const invoiceRepository = getRepository(Invoice);
    const existingInvoice = await invoiceRepository.findOneBy({ id: invoiceId });
    if (!existingInvoice) return null;
    await invoiceRepository.remove(existingInvoice);
    return existingInvoice;
  }
}
