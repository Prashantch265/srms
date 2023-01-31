import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class ApprovalHierarchyDto {
  @ApiProperty({ type: Number })
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  order: number;
}
