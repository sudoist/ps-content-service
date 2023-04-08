import { Injectable } from '@nestjs/common';
import { ClientSession, Schema as MongooseSchema } from 'mongoose';
import { GetQueryDto } from 'src/dto/getQueryDto';
import { ContentRepository } from '../../repositories/content.repository';
import { CreateContentDto } from './dto/createContent.dto';
import { UpdateContentDto } from './dto/updateContent.dto';

@Injectable()
export class ContentService {
    constructor(private contentRepository: ContentRepository) {}

    async createContent(createContentDto: CreateContentDto, session: ClientSession) {
        return await this.contentRepository.createContent(createContentDto, session);
    }

    async getContentById(contentId: MongooseSchema.Types.ObjectId) {
        return await this.contentRepository.getContentById(contentId);
    }

    async getContents(getQueryDto: GetQueryDto) {
        return await this.contentRepository.getContents(getQueryDto);
    }

    async updateContent(updateContentDto: UpdateContentDto, session: ClientSession) {
        return await this.contentRepository.updateContent(updateContentDto, session);
    }
}
