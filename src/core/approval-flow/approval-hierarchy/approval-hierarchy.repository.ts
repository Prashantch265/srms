/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 18:02:05
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 18:16:45
 */

import { FindOptions } from '@mikro-orm/core';
import { EntityRepository } from '@mikro-orm/postgresql';
import ApprovalHierarchy from './approval-hierarchy.entity';

export default class ApprovalHierarchyRepository extends EntityRepository<ApprovalHierarchy> {
  async findOneByFeild(
    where = {},
    options: FindOptions<ApprovalHierarchy> = {},
  ) {
    where = { ...where, isActive: true };
    return await this.findOne(where, options);
  }
}
