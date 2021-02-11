import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/interactors';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Retrieve a user and verifying the password
   * @param {string} email User email
   * @param {string} password User password
   */
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

  /**
   * Login function
   * @param {string} user Populated by Passport during the passport-local authentication flow
   * @returns {user} User object and jwt token
   */
  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
