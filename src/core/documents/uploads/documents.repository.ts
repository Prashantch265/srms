/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 22:13:38
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 22:14:32
 */

import { EntityRepository } from '@mikro-orm/postgresql';
import Document from './documents.entity';

export default class DocumentRepository extends EntityRepository<Document> {}
