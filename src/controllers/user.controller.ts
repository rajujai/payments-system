import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export class UserController {
  static async create(req: Request, res: Response) {
    try {
      const newUser = await UserService.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const user = await UserService.fetchUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: `User not found with id: ${req.body.id}` });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async update(req: Request, res: Response) {
    try {
      const updatedUser = await UserService.updateUser(req.body);
      if (!updatedUser) {
        return res.status(404).json({ error: `User not found with id: ${req.body.id}` });
      }
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  static async delete(req: Request, res: Response) {
    try {
      const deletedUser = await UserService.deleteUserById(req.params.id);
      if (!deletedUser) {
        return res.status(404).json({ error: `User not found with id: ${req.body.id}` });
      }
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
