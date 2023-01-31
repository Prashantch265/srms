/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 21:43:23
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 21:45:33
 */

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DocumentTypeController } from './document-type.controller';
import DocumentType from './document-type.entity';
import DocumentTypeService from './document-type.service';

@Module({
  imports: [MikroOrmModule.forFeature([DocumentType])],
  controllers: [DocumentTypeController],
  providers: [DocumentTypeService],
  exports: [],
})
export default class DocumentTypeModule {}
