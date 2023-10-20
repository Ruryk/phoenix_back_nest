import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';

import { UserAuthService } from './user-auth.service';
import { User } from './schemas/user-auth.schema';
import { AuthGuard } from './auth.guard';

@Controller('api/auth')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('sign-up')
  async signUpUser(
    @Body() body: { email: string; password: string },
  ): Promise<{ message: string }> {
    const { email, password } = body;
    await this.userAuthService.signUpUser(email, password);
    return { message: 'Sign-up successfully' };
  }

  @Post('sign-in')
  async singInUser(
    @Body() body: { email: string; password: string },
  ): Promise<{ message: string; token: string }> {
    const { email, password } = body;
    const token = await this.userAuthService.singInUser(email, password);
    return { message: 'Sign-in successful', token };
  }

  @Get('users')
  @UseGuards(AuthGuard)
  async getUsers(): Promise<User[]> {
    return this.userAuthService.getUsers();
  }
}
