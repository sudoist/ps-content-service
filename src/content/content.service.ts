import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class ContentService {
  getAll() {
    return { name: 'Uchechukwu Azubuko', country: 'Nigeria' };
  }
  getById(param: { id: number }) {
    return param;
  }
  create(req: Request) {
    return req.body;
  }
  update(req: Request, param: { id: number }) {
    return { body: req.body, param };
  }
  delete(param: { id: number }) {
    return param;
  }
}