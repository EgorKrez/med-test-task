import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ApiConfigService } from '../config/api-config.service';
import { IAuthUser } from './auth.model';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {

  constructor(
    private readonly config: ApiConfigService,
  ) {
    super({
      clientID: config.get('GOOGLE_CLIENT_ID'),
      clientSecret: config.get('GOOGLE_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: (a: any, b: any) => void,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user: IAuthUser = {
      email: emails[0].value,
      name: `${name.givenName} ${name.familyName}`,
      avatar: photos[0].value,
      accessToken,
    };
    done(null, user);
  }
}
