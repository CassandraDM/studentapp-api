import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    default: 'Ewample title send with Swagger',
  })
  title: string;
  @ApiPropertyOptional({
    default: 'Example description send with Swagger',
  })
  description?: string;
  @ApiPropertyOptional({
    default: false,
  })
  completed?: boolean;
}
