import { ConflictException, HttpException, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ClientSession, Model, Schema as MongooseSchema } from "mongoose";
import { Content } from "../entities/content.entity";
import { CreateContentDto } from "../modules/content/dto/createContent.dto";
import { GetQueryDto } from "../dto/getQueryDto";
import { UpdateContentDto } from "../modules/content/dto/updateContent.dto";
import { User } from "../entities/user.entity";

export class ContentRepository {
  constructor(@InjectModel(Content.name) private readonly contentModel: Model<Content>, @InjectModel(User.name) private readonly userModel: Model<User>) {
  }

  async createContent(createContentDto: CreateContentDto, session: ClientSession) {
    let content = await this.getContentByTitle(createContentDto.title);

    if (content) {
      throw new ConflictException("Content already exists");
    }

    // TODO: Check later
    // let author = await this.getUserById(createContentDto.authorId);
    //
    // if (author) {
    //   throw new ConflictException("Author does not exist");
    // }

    content = new this.contentModel({
      title: createContentDto.title,
      body: createContentDto.body,
      authorId: createContentDto.authorId,
      youtubeUrl: createContentDto.youtubeUrl,
      status: createContentDto.status
    });

    try {
      content = await content.save({ session });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    if (!content) {
      // throw new ConflictException("Content not created");
      throw new HttpException("message", 400, { cause: new Error("Content not created") });

    }

    return content;
  }

  // TODO: Not working, check later
  async getContentById(id: MongooseSchema.Types.ObjectId) {
    let content;
    try {
      content = await this.contentModel.findById({ _id: id });
    } catch (error) {
      // throw new InternalServerErrorException(error);
      throw new HttpException("message", 400, { cause: new Error(error) });
    }

    if (!content) {
      // throw new NotFoundException("Content not found");
      throw new HttpException("message", 404, { cause: new Error("Content not found") });
    }

    return content;
  }

  async getContents(query: GetQueryDto) {
    let from = query.from || 0;
    from = Number(from);

    let limit = query.limit || 0;
    limit = Number(limit);

    let contents: Content[];

    try {
      if (limit === 0) {
        contents = await this.contentModel
          .find()
          .sort({ createdAt: -1 })
          .exec();
      } else {
        contents = await this.contentModel
          .find()
          .skip(from)
          .limit(limit)
          .sort({ createdAt: -1 })
          .exec();
      }

      let response;

      if (contents.length > 0) {
        response = {
          ok: true,
          data: contents,
          message: "Get Contents Ok!"
        };
      } else {
        response = {
          ok: true,
          data: [],
          message: "No hay contents"
        };
      }
      return response;
    } catch (error) {
      // throw new InternalServerErrorException(error);
      throw new HttpException(error, 400, { cause: new Error(error) });
    }
  }

  async updateContent(updateContent: UpdateContentDto, session: ClientSession) {
    const actualDate = new Date();
    actualDate.toUTCString();

    const updateData = {
      id: updateContent.id,
      title: updateContent.title,
      body: updateContent.body,
      authorId: updateContent.authorId,
      youtubeUrl: updateContent.youtubeUrl,
      status: updateContent.status,
      updatedAt: actualDate
    };

    let content;
    try {
      content = await this.contentModel
        .findOneAndUpdate({ _id: updateContent.id }, updateData, {
          new: true
        })
        .session(session)
        .exec();
    } catch (error) {
      // throw new InternalServerErrorException(error);
      throw new HttpException("message", 400, { cause: new Error(error) });
    }

    if (!content) {
      // throw new ConflictException("Error trying to update content");
      throw new HttpException("message", 400, { cause: new Error("Error trying to update content") });
    }

    return content;
  }

  async getContentByTitle(title: string) {
    let content;
    try {
      content = await this.contentModel.findOne({ title }, "_id title author body youtubeUrl").exec();
    } catch (error) {
      throw new HttpException(error, 400, { cause: new Error(error) });
    }

    return content;
  }

  async getUserById(authorId: number) {
    let user;
    try {
      user = await this.userModel.findById({ authorId }).exec();
    } catch (error) {
      throw new HttpException(error, 400, { cause: new Error(error) });
    }

    return user;
  }
}
