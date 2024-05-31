import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ApiRequestAfterSignIn,
  ApiResponse,
  IUserData,
} from './auth.model';
import { GoogleAuthGuard } from './google-auth.guard';
import { UserService } from '../user/user.service';

const page = `
<html lang="ru">
<head>
<title>Google Sign In</title>
<script>
if (document.cookie.includes('jwt')) {
  window.opener.postMessage('signinsuccess', '*');
}

window.close();
</script>
</head>
</html>
`;

@Controller('auth')
export class AuthController {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {
  }

  @Get('google')
  @UseGuards(GoogleAuthGuard)
  async googleAuth() {
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  async googleAuthRedirect(
    @Req() request: ApiRequestAfterSignIn,
    @Res({ passthrough: true }) response: ApiResponse,
  ) {
    const { user } = request;

    let persistentUser = await this.userService.createOrFind(user);

    const userData: IUserData = { id: persistentUser.id };

    response.cookie('jwt', this.jwtService.sign(userData));

    return page;
  }
}
