import { forwardRef, Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';
import MongooseModule from '../mongoose/mongoose.module';
import { SeederService } from "./seeder.service";
import ConfigModule from '../config/config.module';

@Module({
    imports: [
        ConfigModule,
        MongooseModule,
        AuthModule,
        UserModule
    ],
    providers: [SeederService],
    exports: [SeederService]
})
export class SeederModule { }
