import { ApiProperty } from '@nestjs/swagger';

export class SignupDto {
  @ApiProperty({ default: 'John Doe' })
  email: string;
  @ApiProperty({ default: 'password' })
  password: string;
}
