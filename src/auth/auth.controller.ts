import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModel } from 'src/users/entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/email')
  loginEmail(
    @Body('email') email: UsersModel['email'],
    @Body('password') password: UsersModel['password'],
  ) {
    return this.authService.loginWithEmail({
      email,
      password,
    });
  }

  @Post('register/email')
  registerEmail(
    @Body('email') email: UsersModel['email'],
    @Body('password') password: UsersModel['password'],
    @Body('nickname') nickname: UsersModel['nickname'],
  ) {
    return this.authService.registerWithEmail({
      email,
      password,
      nickname,
    });
  }
}
