import { MongooseModule as MGModule } from '@nestjs/mongoose'
// import { MONGO_URI } from 'src/constant'
import ConfigModule from '../config/config.module'
import { ConfigurationService } from '../config/config.service'

const MongooseModule = MGModule.forRootAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigurationService) => {
    return {
      uri: configService.getMongoURI(),
      user: configService.getDatabaseUsername(),
      pass: configService.getDatabasePassword(),
      useFindAndModify: false
    }
  },
  inject: [ConfigurationService]
})

export default MongooseModule
