import { Injectable, Logger, NotFoundException, UnauthorizedException, } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { User } from './schemas/user-auth.schema';
import { UserMainSettings } from '../users-setting/schemas/user-main-setting.schema';

@Injectable()
export class UserAuthService {
  private readonly logger = new Logger(UserAuthService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async signUpUser(
    email: string,
    password: string,
  ): Promise<{ message: string }> {
    try {
      const hash = await bcrypt.hash(password, 10);
      await this.userModel.create({email, password: hash, settings: this.createInitialSetting()});
      return {message: 'User signed-up successfully'};
    } catch (error) {
      console.error('Error during user registration:', error.message); // Log the error message

      throw new Error('An error occurred while sign-up the user');
    }
  }

  createInitialSetting(): UserMainSettings {
    return {
      theme: {
        mainColor: '#329993',
        textColor: '#ffff',
        backgroundColor: '#ffff',
        backgroundImage: null,
      }
    }
  }

  async singInUser(email: string, password: string): Promise<string> {
    try {
      const user = await this.userModel.findOne({email});
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new UnauthorizedException('Invalid sign-in credentials');
      }
      const payload = {userId: user._id};
      const token = this.jwtService.sign(payload);
      return token;
    } catch (error) {
      console.log(error);
      throw new UnauthorizedException('An error occurred while logging in');
    }
  }

  async getUsers(): Promise<User[]> {
    try {
      const users = await this.userModel.find({});
      return users;
    } catch (error) {
      this.logger.error(
        `An error occurred while retrieving users: ${error.message}`,
      );
      throw new Error('An error occurred while retrieving users');
    }
  }
}
