import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ default: 'John Doe' })
  email: string;
  @ApiProperty({ default: 'password' })
  password: string;
}
