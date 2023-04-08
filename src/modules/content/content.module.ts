import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { Content, ContentSchema } from "../../entities/content.entity";
import { User, UserSchema } from "../../entities/user.entity";
import { ContentRepository } from "../../repositories/content.repository";
import { UserModule } from "../user/user.module";
import { ContentController } from "./content.controller";
import { ContentService } from "./content.service";

@Module({
  imports: [UserModule, MongooseModule.forFeature([
    { name: Content.name, schema: ContentSchema },
    { name: User.name, schema: UserSchema }
  ])],
  controllers: [ContentController],
  providers: [ContentService, ContentRepository],
  exports: [ContentService, ContentRepository]
})
export class ContentModule {
}
