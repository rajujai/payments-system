import express from 'express';
import { TransactionController } from '../controllers/transaction.controller';
import { authenticate } from '../middleware/authentication.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = express.Router();

router.post('/transactions', authenticate, TransactionController.create);
router.get('/transactions/:id', authenticate, TransactionController.getById);
router.put('/transactions', authenticate, authorize(["ADMIN"]), TransactionController.update);
// router.delete('/transactions/:id', authenticate, TransactionController.delete);

export default router;
