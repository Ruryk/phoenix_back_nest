import { Injectable, Logger, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user-auth/schemas/user-auth.schema';
import { UserThemeSettings } from './schemas/user-theme.schema';

@Injectable()
export class UserSettingsService {
  private readonly logger = new Logger(UserSettingsService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
  ) {}

  async getThemeSetting(id: string):
    Promise<Promise<UserThemeSettings | { message: string }>> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {message: 'User not found'};
      }

      return user.settings.theme;
    } catch (error) {
      console.error('Error during loading user theme settings:', error.message);

      throw new Error('An error occurred while try to get theme settings');
    }
  }

  async changeThemeSetting(id: string, theme: UserThemeSettings):
    Promise<Promise<UserThemeSettings | { message: string }>> {
    try {
      const user = await this.userModel.findById(id);
      if (!user) {
        return {message: 'User not found'};
      }

      user.settings.theme = theme;
      const updatedUser = await user.save();

      return updatedUser.settings.theme;
    } catch (error) {
      console.error('Error during changing user theme settings:', error.message);

      throw new Error('An error occurred while try to change theme settings');
    }
  }
}
