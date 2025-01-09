import { ApiProperty } from '@nestjs/swagger';

export class SigninDto {
  @ApiProperty({ default: 'John Doe' })
  email: string;
  @ApiProperty({ default: 'password' })
  password: string;
}
