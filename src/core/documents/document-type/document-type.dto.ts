import { ToTrimmed } from '@decorators/transform-input.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class DocumentTypeDto {
  @ApiProperty({ type: String })
  @IsNotEmpty()
  @IsString()
  @ToTrimmed()
  name: string;

  @ApiProperty({ type: Number })
  @IsNotEmpty()
  quantity: number;

  @ApiProperty({ type: Boolean, default: false })
  @IsNotEmpty()
  originalRequired: boolean;

  @ApiProperty({ type: Boolean, default: false })
  @IsNotEmpty()
  optional: boolean;

  @ApiPropertyOptional({ type: String })
  @IsOptional()
  @IsString()
  @ToTrimmed()
  description: string;
}
