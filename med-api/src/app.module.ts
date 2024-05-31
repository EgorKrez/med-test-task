import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { RecordsModule } from './records/records.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    RecordsModule,
  ],
})
export class AppModule {
}
