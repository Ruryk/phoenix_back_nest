import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { UserSettingsService } from './user.settings.service';
import { UserThemeSettings } from './schemas/user-theme.schema';
import { JwtService } from '@nestjs/jwt';

@Controller('api/settings')
export class UserSettingsController {
  constructor(private readonly userSettingService: UserSettingsService,
              private readonly jwtService: JwtService) {}

  @Get('theme')
  async getThemeSettings(
    @Req() request: Request
  ): Promise<UserThemeSettings | { message: string }> {
    const token = request.headers['authorization'].split('Bearer ')[1];
    const verified = this.jwtService.verify(token);
    if (!verified) {
      return {message: 'Invalid token'};
    }
    return this.userSettingService.getThemeSetting(verified.userId);
  }

  @Post('theme')
  async changeThemeSettings(
    @Req() request: Request,
    @Body() theme: UserThemeSettings
  ): Promise<UserThemeSettings | { message: string }> {
    const token = request.headers['authorization'].split('Bearer ')[1];
    const verified = this.jwtService.verify(token);
    if (!verified) {
      return {message: 'Invalid token'};
    }
    return this.userSettingService.changeThemeSetting(verified.userId, theme);
  }
}
