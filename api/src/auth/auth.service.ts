import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  signin(SigninDto: SigninDto) {
    return 'You are signed in';
  }

  async signup(SignupDto: SignupDto) {
    // encrypt password
    const password = await bcrypt.hash(SignupDto.password, 10);
    SignupDto.password = password;
    // create user
    return this.userService.create(SignupDto);
  }
}
