import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
  }
  /**
   * Function that parse JSON object
   * @param {string} payload Decoded JSON by Passport
   * @returns {object} return an object containing the userId and email properties
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email };
  }
}
