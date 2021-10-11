import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  avatar: string;

  @Prop()
  roles: string[];

  isAdmin(): boolean {
    return this.roles.includes('admin');
  }
}

export const UserSchema = SchemaFactory.createForClass(User);
