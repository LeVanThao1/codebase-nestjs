import { forwardRef, Module } from '@nestjs/common';
import { HistoryResolver } from './history.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { DATABASE_COLLECTIONS } from '../../constant';
import { HistorySchema } from './schema/history.schema';
import { HistoryService } from "./history.service";
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DATABASE_COLLECTIONS.HISTORY, schema: HistorySchema }
    ])
  ],
  providers: [HistoryService, HistoryResolver],
  exports: [HistoryService],
})
export class HistoryModule {}
