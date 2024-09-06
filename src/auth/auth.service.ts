import { Injectable } from '@nestjs/common';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  async register(registerDto: RegisterDto) {
    // const registredUser = await this.userService.create(registerDto)
    // // const payload = { username: registredUser.name, sub: registredUser.id };
    // return {
    //   access_token: this.jwtService.sign(payload),
    // };
  }

  login(loginDto: LoginDto) {}
}
