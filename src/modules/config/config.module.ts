import { Global, Module } from "@nestjs/common";
import { ConfigModule as NestConfigModule } from "@nestjs/config";
import { ConfigKeys } from "./config.interface";
import { ConfigurationService } from "./config.service";


const Config = NestConfigModule.forRoot({
    isGlobal: true,
    envFilePath: 
    process.env.NODE_ENV !== 'production'
        ? '.env.development'
        : '.env.production',
    load: [
        (): ConfigKeys => ({
            APP_PORT: parseInt(process.env.APP_PORT) || 4200,
            MONGO_URI: process.env.MONGO_URI || "mongodb+srv://thaolv210402:ta210402@cluster0.2o95l.mongodb.net/express-graphql?retryWrites=true&w=majority",
            DATABASE_USERNAME: process.env.DATABASE_USERNAME || "",
            DATABASE_PASSWORD: process.env.DATABASE_PASSWORD || "",
            GRAPHQL_END: process.env.GRAPHQL_END || "graphql",
            NODE_ENV: process.env.NODE_ENV || "development",
            PASSWORD_HASH_SALT: 11,
            TOKEN_ENCRYPT_SECRET: process.env.TOKEN_ENCRYPT_SECRET || 's3cr3t!@#' 
        })
    ]
})

@Global()
@Module({
    imports: [Config],
    providers: [ConfigurationService],
    exports: [ConfigurationService]
})
export default class ConfigModule {}
