import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, unique: true })
  userName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true, enum: ["ADMIN", "USER"] })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
