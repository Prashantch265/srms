/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 22:10:00
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 22:21:50
 */

import PrimaryEntity from '@core/Common/entities/primary.entity';
import ExternalUser from '@core/external-users/external-users.entity';
import {
  Entity,
  EntityRepositoryType,
  Property,
  ManyToOne,
} from '@mikro-orm/core';
import DocumentType from '../document-type/document-type.entity';
import DocumentRepository from './documents.repository';

@Entity({ tableName: 'documents', customRepository: () => DocumentRepository })
export default class Document extends PrimaryEntity {
  @Property({ name: 'file' })
  file: string;

  @ManyToOne(() => DocumentType, {
    name: 'document_type_id',
    nullable: true,
    onDelete: 'cascade',
  })
  documentTypeId: number;

  @ManyToOne(() => ExternalUser, {
    name: 'user_id',
    type: 'uuid',
    onDelete: 'cascade',
  })
  userId: string;

  [EntityRepositoryType]?: DocumentRepository;
}
