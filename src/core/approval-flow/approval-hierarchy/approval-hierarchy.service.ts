/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 18:02:38
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 18:37:20
 */

import { Injectable } from '@nestjs/common';
import { ApprovalHierarchyDto } from './approval-hierarchy.dto';
import ApprovalHierarchy from './approval-hierarchy.entity';
import ApprovalHierarchyRepository from './approval-hierarchy.repository';

@Injectable()
export default class ApprovalHierarchyService {
  constructor(
    private readonly approvalHierarchyRepository: ApprovalHierarchyRepository,
  ) {}

  async createApprovalHierarchy(data: ApprovalHierarchyDto) {
    const approvalHierarchy: ApprovalHierarchy =
      this.approvalHierarchyRepository.create({
        ...ApprovalHierarchy,
        ...data,
      });

    await this.approvalHierarchyRepository.persistAndFlush(approvalHierarchy);

    return approvalHierarchy;
  }

  async updateApprovalHierarchy(id: number, data: ApprovalHierarchyDto) {
    const existingHierarchy =
      await this.approvalHierarchyRepository.findOneByFeild(
        { id: id },
        { fields: ['id', 'roleId', 'order'] },
      );

    const updatedHierarchy: ApprovalHierarchy =
      this.approvalHierarchyRepository.assign(existingHierarchy, data);

    await this.approvalHierarchyRepository.persistAndFlush(updatedHierarchy);

    return id;
  }

  async getApprovalHierarchy() {
    return this.approvalHierarchyRepository;
  }

  async getApprovalHierarchyById(id: number) {
    return this.approvalHierarchyRepository;
  }

  async deleteApprovalHierarchy(id: number) {
    return this.approvalHierarchyRepository.nativeDelete(id);
  }
}
