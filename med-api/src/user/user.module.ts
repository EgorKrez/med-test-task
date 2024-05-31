import { Module } from '@nestjs/common';
import { ApiConfigModule } from '../config/api.config.module';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    ApiConfigModule,
  ],
  providers: [
    UserService,
  ],
  controllers: [
    UserController,
  ],
  exports: [
    UserService,
  ]
})
export class UserModule {
}
