import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/authentication.middleware';

const router = express.Router();

router.post('/users', authenticate, UserController.create);
router.get('/users', authenticate, UserController.getAll);
router.get('/users/:id', authenticate, UserController.getById);
router.get('/users/:email', authenticate, UserController.getByEmail);
router.put('/users', authenticate, UserController.update);
router.delete('/users/:id', authenticate, UserController.delete);

export default router;
