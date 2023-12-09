import express from 'express';
import { InvoiceController } from '../controllers/invoice.controller';
import { authenticate } from '../middleware/authentication.middleware';

const router = express.Router();

router.post('/invoices', authenticate, InvoiceController.create);
router.get('/invoices', authenticate, InvoiceController.getAll);
router.get('/invoices/:id', authenticate, InvoiceController.getById);
// router.put('/invoices', authenticate, InvoiceController.update);
// router.delete('/invoices/:id', authenticate, InvoiceController.delete);

export default router;
