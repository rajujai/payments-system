import { User } from '../models/User';
import md5 from 'blueimp-md5';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/repos';

export class UserService {

  static async createUser(userData: Partial<User>): Promise<User> {
    if (userData.passwordHash) userData.passwordHash = md5(userData.passwordHash);
    const user = UserRepository.create(userData);
    return await UserRepository.save(user);
  }

  static async getAll(): Promise<User[]> {
    return await UserRepository.find();
  }

  static async fetchUserById(userId: string): Promise<User | null> {
    return await UserRepository.findOneBy({ id: userId });
  }

  static async fetchUserByEmail(email: string): Promise<User | null> {
    return await UserRepository.findOneBy({ email: email });
  }


  static async updateUser(updatedUserData: Partial<User>): Promise<User | null> {
    const existingUser = await UserRepository.findOneBy({ id: updatedUserData.id });
    if (!existingUser) return null;
    const updatedUser = UserRepository.merge(existingUser, updatedUserData);
    return await UserRepository.save(updatedUser);
  }


  static async deleteUserById(userId: string): Promise<User | null> {
    const existingUser = await UserRepository.findOneBy({ id: userId });
    if (!existingUser) return null;
    await UserRepository.remove(existingUser);
    return existingUser;
  }


  static async login(email: string, password: string) {
    const user = await UserRepository.findOneBy({ email: email });
    if (!user) throw new Error("Email not registered");
    if (md5(password) !== user.passwordHash) throw new Error("Invalid credentials");
    return jwt.sign({ id: user.id, username: user.username }, process.env.SECRET_KEY || "", { issuer: "system" });
  };
}
