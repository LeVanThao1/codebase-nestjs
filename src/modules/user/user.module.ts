import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_COLLECTIONS } from '../../constant';
import { UserSchema } from './schema/user.schema';
import { AuthModule } from "../auth/auth.module";
import { HistoryModule } from '../history/history.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DATABASE_COLLECTIONS.USER, schema: UserSchema }
    ]),
    forwardRef(() => AuthModule),
    HistoryModule
  ],
  providers: [UserService, UserResolver],
  exports: [UserService],
})
export class UserModule {}
