import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({versionKey: false, timestamps: false, _id: false})
export class UserThemeSettings {
  @Prop()
  mainColor: string;
  @Prop()
  textColor: string;
  @Prop()
  backgroundColor: string;
  @Prop()
  backgroundImage: string | null;
}

export const UserTheme = SchemaFactory.createForClass(UserThemeSettings);

