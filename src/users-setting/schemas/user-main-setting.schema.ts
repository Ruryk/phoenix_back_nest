import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserThemeSettings } from './user-theme.schema';

@Schema({versionKey: false, timestamps: false, _id: false})
export class UserMainSettings {
  @Prop()
  theme: UserThemeSettings
}

export const UserSettings = SchemaFactory.createForClass(UserMainSettings);

