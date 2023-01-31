/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 17:47:01
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 18:36:52
 */

import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import ApprovalHierarchyController from './approval-hierarchy.controller';
import ApprovalHierarchy from './approval-hierarchy.entity';
import ApprovalHierarchyService from './approval-hierarchy.service';

@Module({
  imports: [MikroOrmModule.forFeature([ApprovalHierarchy])],
  controllers: [ApprovalHierarchyController],
  providers: [ApprovalHierarchyService],
  exports: [],
})
export default class ApprovalHierarchyModule {}
