import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtGuard } from '../auth/jwt.guard';
import { GetUserData } from '../common/user.decorator';
import { IUserData } from '../auth/auth.model';
import { IUser } from './user.schema';
import { UserService } from './user.service';

@Controller('user')
@UseGuards(JwtGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@GetUserData() { id }: IUserData): Promise<IUser> {
    const user = await this.userService.get(id);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      ...user,
      password: '***************',
    };
  }

  @Post('edit')
  async editCommonData(
    @GetUserData() { id }: IUserData,
    @Body()
    { firstName, lastName, middleName, phone, email, login, personId }: IUser,
  ) {
    const user = await this.userService.get(id);

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.middleName = middleName || user.middleName;
    user.phone = phone || user.phone;
    user.email = email || user.email;
    user.login = login || user.login;
    user.personId = personId || user.personId;
  }

  @Post('password')
  async editPassword(
    @GetUserData() { id }: IUserData,
    @Body() { oldPassword, newPassword }: any,
  ) {
    const user = await this.userService.get(id);

    if (user.password && user.password !== oldPassword) {
      throw new Error('Incorrect old password');
    }

    if (
      !newPassword ||
      typeof newPassword !== 'string' ||
      newPassword.length < 3
    ) {
      throw new Error('Incorrect new password');
    }

    user.password = newPassword;
  }
}
