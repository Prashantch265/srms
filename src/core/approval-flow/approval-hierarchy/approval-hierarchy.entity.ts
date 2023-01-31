/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 17:46:56
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 18:04:31
 */

import Role from '@core/authorization/role/role.entity';
import PrimaryEntity from '@core/Common/entities/primary.entity';
import {
  Entity,
  EntityRepositoryType,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import ApprovalHierarchyRepository from './approval-hierarchy.repository';

@Entity({
  tableName: 'approval_hierarchy',
  customRepository: () => ApprovalHierarchyRepository,
})
export default class ApprovalHierarchy extends PrimaryEntity {
  @ManyToOne(() => Role, {
    name: 'role_id',
    onDelete: 'cascade',
    nullable: true,
  })
  roleId: number;

  @Property({ name: 'order' })
  order: number;

  [EntityRepositoryType]?: ApprovalHierarchyRepository;
}
