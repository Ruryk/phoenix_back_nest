import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { UserMainSettings } from '../../users-setting/schemas/user-main-setting.schema';

@Schema({timestamps: true})
export class User {
  @Prop()
  email: string;
  @Prop()
  password: string;
  @Prop()
  settings: UserMainSettings
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
