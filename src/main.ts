import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Authencation } from './modules/auth/guard/authentication.guard';
import { PermissionGuard } from './modules/auth/guard/permission.guard';
import { ConfigurationService } from './modules/config/config.service';
import { GQLAgumentGuard } from './modules/graphql/gql.arg.guard';
import { GQLArgValidationFailedError } from './modules/graphql/gql.error';
import { ApolloErrorFilter, DocumentValidationErrorFilter } from './modules/graphql/gql.exception.filter';

declare const module: any;

const logger = new Logger('Main')
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPort = app.get(ConfigurationService).getAppListeningPort()

  app.useGlobalGuards(new GQLAgumentGuard(new Reflector()))
  app.useGlobalGuards(new Authencation(new Reflector()))
  app.useGlobalGuards(new PermissionGuard(new Reflector()))
  app.useGlobalFilters(new ApolloErrorFilter())

  app.useGlobalPipes(new ValidationPipe({
    exceptionFactory: errors => {
      return new GQLArgValidationFailedError(errors)
    }
  }))

  app.useGlobalFilters(new DocumentValidationErrorFilter())
  
  await app.listen(appPort, () => {
    const mongoUri = app.get(ConfigurationService).getMongoURI();
    logger.debug('Database uri: ' + mongoUri)
    logger.debug('App is listening on port ' + appPort)
  })

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

}
bootstrap();
