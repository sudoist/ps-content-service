import {
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { ContentService } from '../../content/content.service';

@Controller('contents')
export class ContentController {
  constructor(private contentService: ContentService) {}
  @Get()
  getAll() {
    return this.contentService.getAll();
  }
  @Get('/:id')
  getOne(@Param() param: { id: number }) {
    return this.contentService.getById(param);
  }
  @Post()
  store(@Req() req: Request) {
    return this.contentService.create(req);
  }
  @Patch('/:id')
  update(@Req() req: Request, @Param() param: { id: number }) {
    return this.contentService.update(req, param);
  }
  @Delete()
  delete(@Param() param: { id: number }) {
    return this.contentService.delete(param);
  }
}