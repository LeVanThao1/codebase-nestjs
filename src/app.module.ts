import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import ConfigModule from "./modules/config/config.module";
import MongooseModule from "./modules/mongoose/mongoose.module";
import GraphQLModule from "./modules/graphql/gql.module";
import { AuthModule } from "./modules/auth/auth.module";
import { HistoryModule } from './modules/history/history.module';

@Module({
  imports: [
    ConfigModule,
    MongooseModule,
    GraphQLModule,
    HistoryModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
