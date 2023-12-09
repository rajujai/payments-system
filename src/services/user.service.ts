import { getRepository } from 'typeorm';
import { User } from '../models/User';
import md5 from 'blueimp-md5';

export class UserService {

  static async createUser(userData: Partial<User>): Promise<User> {
    const userRepository = getRepository(User);
    if(userData.passwordHash) userData.passwordHash = md5(userData.passwordHash);
    const user = userRepository.create(userData);
    return await userRepository.save(user);
  }

  static async getAll(): Promise<User[]> {
    const userRepository = getRepository(User);
    return await userRepository.find();
  }

  static async fetchUserById(userId: string): Promise<User | null> {
    const userRepository = getRepository(User);
    return await userRepository.findOneBy({ id: userId });
  }

  static async fetchUserByEmail(email: string): Promise<User | null> {
    const userRepository = getRepository(User);
    return await userRepository.findOneBy({ id: email });
  }


  static async updateUser(updatedUserData: Partial<User>): Promise<User | null> {
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOneBy({ id: updatedUserData.id });
    if (!existingUser) return null;
    const updatedUser = userRepository.merge(existingUser, updatedUserData);
    return await userRepository.save(updatedUser);
  }


  static async deleteUserById(userId: string): Promise<User | null> {
    const userRepository = getRepository(User);
    const existingUser = await userRepository.findOneBy({ id: userId });
    if (!existingUser) return null;
    await userRepository.remove(existingUser);
    return existingUser;
  }
}
