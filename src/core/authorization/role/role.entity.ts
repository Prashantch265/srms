/*
 * @Author: prashant.chaudhary
 * @Date: 2022-12-26 00:37:45
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 22:43:03
 */

import ApprovalHierarchy from '@core/approval-flow/approval-hierarchy/approval-hierarchy.entity';
import ApprovalJourney from '@core/approval-flow/approval-journey/approval-journey.entity';
import PrimaryEntity from '@core/Common/entities/primary.entity';
import {
  Collection,
  Entity,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import RSMP from '../role-module-privilege/rsmp.entity';

@Entity({ tableName: 'roles' })
export default class Role extends PrimaryEntity {
  @Property({ name: 'name' })
  name: string;

  @Property({ name: 'code', unique: true })
  code: string;

  @Property({ name: 'description', nullable: true })
  description: string;

  @OneToMany(() => RSMP, (rsmp) => rsmp.roleId)
  rsmp = new Collection<RSMP>(this);

  @OneToOne(
    () => ApprovalHierarchy,
    (approvalHierarchy) => approvalHierarchy.roleId,
  )
  approvalHierarchy!: ApprovalHierarchy;

  @OneToMany(() => ApprovalJourney, (approvalJourney) => approvalJourney.roleId)
  approvalJourney = new Collection<ApprovalJourney>(this);
}
