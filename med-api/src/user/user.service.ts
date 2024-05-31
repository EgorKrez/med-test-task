import { Injectable } from '@nestjs/common';
import { IUser } from './user.schema';
import { IAuthUser } from '../auth/auth.model';

@Injectable()
export class UserService {
  private readonly users: IUser[] = [];

  async createOrFind(createUserDto: IAuthUser): Promise<IUser> {
    const find = this.users.find(u => u.email === createUserDto.email)

    if (!find) {
      const newUser: IUser = {
        id: Math.random().toString().slice(2),
        firstName: createUserDto.name.split(' ')[0],
        lastName: createUserDto.name.split(' ')[1],
        middleName: createUserDto.name.split(' ')[2] || '',
        password: '',
        login: createUserDto.email.split('@')[0],
        phone: '1111111111111',
        personId: '11111111111111',
        email: createUserDto.email,
        avatar: createUserDto.avatar,
      }

      this.users.push(newUser)

      return newUser;
    }

    return find;
  }

  async get(id: string): Promise<IUser> {
    return this.users.find(u => u.id === id);
  }
}
