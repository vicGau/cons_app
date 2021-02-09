import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/interactors/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne({ where: { email } });
    const isEqual = await bcrypt.compare(password, user.password);

    if (isEqual) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
