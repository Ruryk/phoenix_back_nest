import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { UserAuthController } from './user-auth.controller';
import { UserAuthService } from './user-auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user-auth.schema';
import { secretKey } from './config';
import { UserSettingsController } from '../users-setting/user-settings.controller';
import { UserSettingsService } from '../users-setting/user.settings.service';

@Module({
  imports: [
    MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
    JwtModule.register({
      secret: secretKey.secret,
      signOptions: {expiresIn: '1h'},
    }),
  ],
  controllers: [UserAuthController, UserSettingsController],
  providers: [UserAuthService, UserSettingsService],
})
export class UserAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
