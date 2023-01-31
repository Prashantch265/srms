/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 20:24:14
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 22:08:45
 */

import { SuccessMessage } from '@core/Common/interfaces/common.interface';
import { ResponseMessage } from '@decorators/response.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DocumentTypeDto } from './document-type.dto';
import DocumentTypeService from './document-type.service';

@ApiTags('Document Type')
@Controller('document-type')
export class DocumentTypeController {
  constructor(private readonly documentTypeService: DocumentTypeService) {}

  @Post()
  @ResponseMessage(SuccessMessage.CREATE, 'document type')
  async createDocumentType(@Body() data: DocumentTypeDto) {
    return await this.documentTypeService.createDocumentType(data);
  }

  @Get()
  @ResponseMessage(SuccessMessage.FETCH, 'document type')
  async getAllDocumentType() {
    return await this.documentTypeService.getAllDocumentType();
  }

  @Get(':id')
  @ResponseMessage(SuccessMessage.FETCH, 'document type')
  async getDocumentTypeById(@Param('id') id: number) {
    return await this.documentTypeService.getDocumentTypeById(id);
  }

  @Put(':id')
  @ResponseMessage(SuccessMessage.UPDATE, 'document type')
  async updateDocumentType(@Param('id') id: number, data: DocumentTypeDto) {
    return await this.documentTypeService.updateDocumentType(id, data);
  }

  @Delete(':id')
  @ResponseMessage(SuccessMessage.CREATE, 'document type')
  async deleteDocumentType(@Param('id') id: number) {
    return await this.documentTypeService.deleteDocumentType(id);
  }
}
