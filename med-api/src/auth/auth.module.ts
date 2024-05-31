import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtModuleOptions } from '@nestjs/jwt/dist/interfaces/jwt-module-options.interface';
import { ApiConfigService } from '../config/api-config.service';
import { ApiConfigModule } from '../config/api.config.module';
import { AuthController } from './auth.controller';
import { GoogleStrategy } from './google-auth.strategy';
import { JwtGuard } from './jwt.guard';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ApiConfigModule,
    UserModule,
    JwtModule.registerAsync({
      inject: [ApiConfigService],
      imports: [ApiConfigModule],
      useFactory: (configService: ApiConfigService): JwtModuleOptions => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
    }),
  ],
  providers: [GoogleStrategy, JwtStrategy, JwtGuard],
  controllers: [AuthController],
})
export class AuthModule {

}
