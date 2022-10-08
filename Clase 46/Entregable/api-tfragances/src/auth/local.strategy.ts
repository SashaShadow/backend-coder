
import { Strategy } from 'passport-local';
import { Response } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string, @Response() res): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
    //   throw new UnauthorizedException();
        res.redirect('/login');
    }
    return user;
  }
}
