import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { ConfigKeys } from './config.interface'


@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService<ConfigKeys>) {}

  public getAppListeningPort() {
    return this.configService.get('APP_PORT')
  }

  public getMongoURI () {
    return this.configService.get('MONGO_URI')
  }

  public getDatabaseUsername () {
    return this.configService.get('DATABASE_USERNAME')
  }

  public getDatabasePassword () {
    return this.configService.get('DATABASE_PASSWORD')
  }

  public getDatabaseName () {
    return this.configService.get('DATABASE_NAME')
  }


  public getGQLEndpointPath() {
    return this.configService.get('GRAPHQL_END')
  }

  public getNodeEnv() {
    return this.configService.get('NODE_ENV')
  }
  /**
   * @description This function return defined password salt
   * used when hash password
   * @returns number
   */
  public getPasswordHashSalt () {
    return this.configService.get<number>('PASSWORD_HASH_SALT')
  }

  public getTokenEncryptSecret () {
    return this.configService.get<string>('TOKEN_ENCRYPT_SECRET')
  }
}
