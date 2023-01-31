/*
 * @Author: prashant.chaudhary
 * @Date: 2023-01-29 18:05:00
 * @Last Modified by: prashant.chaudhary
 * @Last Modified time: 2023-01-29 18:36:28
 */

import { SuccessMessage } from '@core/Common/interfaces/common.interface';
import { ResponseMessage } from '@decorators/response.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ApprovalHierarchyDto } from './approval-hierarchy.dto';
import ApprovalHierarchyService from './approval-hierarchy.service';

@ApiTags('Approval Hierarchy')
@Controller()
export default class ApprovalHierarchyController {
  constructor(
    private readonly approvalHierarchyService: ApprovalHierarchyService,
  ) {}

  @Post()
  @ResponseMessage(SuccessMessage.CREATE, 'approval hierarchy')
  async createApprovalHierarchy(@Body() data: ApprovalHierarchyDto) {
    return await this.approvalHierarchyService.createApprovalHierarchy(data);
  }

  @Get()
  @ResponseMessage(SuccessMessage.FETCH, 'approval hierarchy')
  async getApprovalHierarchy() {
    return await this.approvalHierarchyService.getApprovalHierarchy();
  }

  @Get(':id')
  @ResponseMessage(SuccessMessage.FETCH, 'approval hierarchy')
  async getApprovalHierarchyById(@Param('id') id: number) {
    return await this.approvalHierarchyService.getApprovalHierarchyById(id);
  }

  @Put(':id')
  @ResponseMessage(SuccessMessage.UPDATE, 'approval hierarchy')
  async updateApprovalHierarchy(
    @Param('id') id: number,
    data: ApprovalHierarchyDto,
  ) {
    return await this.approvalHierarchyService.updateApprovalHierarchy(
      id,
      data,
    );
  }

  @Delete(':id')
  @ResponseMessage(SuccessMessage.DELETE, 'approval hierarchy')
  async deleteApprovalHierarchy(@Param('id') id: number) {
    return await this.approvalHierarchyService.deleteApprovalHierarchy(id);
  }
}
