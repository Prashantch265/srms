/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 18:41:27
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 22:23:17
 */

import Role from '@core/authorization/role/role.entity';
import PrimaryEntity from '@core/Common/entities/primary.entity';
import { JourneyStatus } from '@core/Common/interfaces/common.interface';
import { Entity, Enum, ManyToOne, Property } from '@mikro-orm/core';
import { ApprovalJourneyRepository } from './approval-journey.repository';

@Entity({
  tableName: 'approval_journey',
  customRepository: () => ApprovalJourneyRepository,
})
export default class ApprovalJourney extends PrimaryEntity {
  @ManyToOne(() => Document, { name: 'document_id', onDelete: 'cascade' })
  documentId: number;

  @ManyToOne(() => Role, { name: 'role_id', onDelete: 'cascade' })
  roleId: number;

  @Enum({
    items: () => JourneyStatus,
    name: 'status',
    default: JourneyStatus.PENDING,
  })
  status: JourneyStatus;
}
