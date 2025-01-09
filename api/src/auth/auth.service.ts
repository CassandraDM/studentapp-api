import { Injectable } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}
  async signin(SigninDto: SigninDto) {
    //check if user exists & get user
    const user = await this.userService.findOneByEmail(SigninDto.email);
    if (!user) {
      return 'Mismatch';
    }
    //check if password is correct
    const isValid = await bcrypt.compare(SigninDto.password, user.password);
    if (!isValid) {
      return 'Mismatch';
    }
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
