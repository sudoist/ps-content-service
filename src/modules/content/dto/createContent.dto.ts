import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

export class CreateContentDto {
  @IsOptional()
  id: MongooseSchema.Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  title: string;

  // TODO: If possible get object from users collection
  @IsNotEmpty()
  authorId: number;

  @IsString()
  @IsNotEmpty()
  body: string;

  @IsString()
  @IsNotEmpty()
  youtubeUrl: string;

  @IsString()
  @IsNotEmpty()
  status: string;
}
