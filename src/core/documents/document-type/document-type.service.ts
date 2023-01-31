/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 20:24:55
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 22:03:11
 */

import { FindOptions } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { DocumentTypeDto } from './document-type.dto';
import DocumentType from './document-type.entity';

export default class DocumentTypeService {
  constructor(
    @InjectRepository(DocumentType)
    private readonly documentTypeRepository: EntityRepository<DocumentType>,
  ) {}

  async findOneByFeild(where = {}, options: FindOptions<DocumentType> = {}) {
    where = { ...where, isActive: true };
    return await this.documentTypeRepository.findOne(where, options);
  }

  async createDocumentType(data: DocumentTypeDto) {
    const documentType: DocumentType = this.documentTypeRepository.create({
      ...DocumentType,
      ...data,
    });

    await this.documentTypeRepository.persistAndFlush(documentType);

    return documentType;
  }

  async getAllDocumentType() {
    return await this.documentTypeRepository.findAll({
      filters: { isActive: true },
      fields: [
        'id',
        'name',
        'description',
        'quantity',
        'originalRequired',
        'optional',
      ],
    });
  }

  async getDocumentTypeById(id: number) {
    return await this.findOneByFeild(
      { id: id },
      {
        fields: [
          'id',
          'name',
          'description',
          'quantity',
          'originalRequired',
          'optional',
        ],
      },
    );
  }

  async updateDocumentType(id: number, data: DocumentTypeDto) {
    const existingDocumentType = await this.getDocumentTypeById(id);

    const updatedDocumentType: DocumentType =
      this.documentTypeRepository.assign(existingDocumentType, data);

    await this.documentTypeRepository.persistAndFlush(updatedDocumentType);

    return id;
  }

  async deleteDocumentType(id: number) {
    return await this.documentTypeRepository.nativeDelete(id);
  }
}
