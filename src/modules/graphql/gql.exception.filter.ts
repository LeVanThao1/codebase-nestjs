import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
  } from '@nestjs/common'
  // import { BaseExceptionFilter } from '@nestjs/core'
  // import { GqlExceptionFilter } from '@nestjs/graphql'
  import { ApolloError } from 'apollo-server-express'
  import { Error } from 'mongoose'
  
  @Catch(ApolloError)
  export class ApolloErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      throw exception
    }
  }
  
  
  @Catch(Error.ValidationError)
  export class DocumentValidationErrorFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost) {
      throw new ApolloError('Hello world')
    }
  }
  