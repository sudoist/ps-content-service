import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { ContentModule } from "./modules/content.module";

@Module({
  controllers: [AppController],
  imports: [ContentModule],
})
export class AppModule {}