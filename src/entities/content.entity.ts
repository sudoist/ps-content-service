import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Content extends Document {
  @Prop({ required: true, unique: true })
  title: string;

  @Prop({ required: true })
  body: string;

  @Prop({ required: true })
  youtubeUrl: string;

  @Prop({ required: true })
  authorId: number;

  @Prop({ required: true, enum: ["PUBLISHED", "UNPUBLISHED"] })
  status: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const ContentSchema = SchemaFactory.createForClass(Content);
