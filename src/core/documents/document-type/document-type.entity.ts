/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 20:20:06
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 22:18:28
 */

import PrimaryEntity from '@core/Common/entities/primary.entity';
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
import Document from '../uploads/documents.entity';

@Entity({ tableName: 'document_type' })
export default class DocumentType extends PrimaryEntity {
  @Property({ name: 'name' })
  name: string;

  @Property({ name: 'quantity', default: 1 })
  quantity: number;

  @Property({ name: 'original_required', default: false })
  originalRequired: boolean;

  @Property({ name: 'optional', default: false })
  optional: boolean;

  @Property({ name: 'description', nullable: true })
  description: string;

  @OneToMany(() => Document, (document) => document.documentTypeId)
  document = new Collection<Document>(this);
}
