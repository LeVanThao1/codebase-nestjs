import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from '../user/user.module';
import { JwtModule } from "@nestjs/jwt";
import ConfigModule from '../config/config.module';
import { ConfigurationService } from '../config/config.service';

@Module({
    imports: [
        forwardRef(() => UserModule),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigurationService) => {
                return {
                    secret: configService.getTokenEncryptSecret(),
                    signOptions: { algorithm: "HS512", expiresIn: "10d" },
                }
            },
            inject: [ConfigurationService]
        })
    ],
    providers: [AuthService, AuthResolver],
    exports: [AuthService]
})
export class AuthModule { }
