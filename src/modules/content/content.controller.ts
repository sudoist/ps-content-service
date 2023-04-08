import { BadRequestException, Body, Controller, Get, HttpStatus, Param, Post, Put, Query, Res } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Response } from "express";
import { Connection, Schema as MongooseSchema } from "mongoose";
import { GetQueryDto } from "../../dto/getQueryDto";
import { CreateContentDto } from "./dto/createContent.dto";
import { UpdateContentDto } from "./dto/updateContent.dto";
import { ContentService } from "./content.service";

@Controller("contents")
export class ContentController {
  constructor(@InjectConnection() private readonly mongoConnection: Connection, private contentService: ContentService) {
  }

  @Get("/")
  async getAllContents(@Query() getQueryDto: GetQueryDto, @Res() res: any) {
    const storages: any = await this.contentService.getContents(getQueryDto);
    return res.status(HttpStatus.OK).send(storages);
  }

  @Get("/:id")
  async getContentById(@Param("id") id: MongooseSchema.Types.ObjectId, @Res() res: Response) {
    const storage: any = await this.contentService.getContentById(id);
    return res.status(HttpStatus.OK).send(storage);
  }

  @Post("/")
  async createContent(@Body() createContentDto: CreateContentDto, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const newContent: any = await this.contentService.createContent(createContentDto, session);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(newContent);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      await session.endSession();
    }
  }

  @Put("/")
  async updateContent(@Body() updateContentDto: UpdateContentDto, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const newContent: any = await this.contentService.updateContent(updateContentDto, session);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(newContent);
    } catch (error) {
      await session.abortTransaction();
      throw new BadRequestException(error);
    } finally {
      await session.endSession();
    }
  }

  // TODO: Add delete later
}
