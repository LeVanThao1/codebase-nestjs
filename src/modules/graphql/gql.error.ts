import { ApolloError, ValidationError } from "apollo-server-express"

export class GQLArgValidationFailedError extends ApolloError {
  public static code = 'INVALID_ARGUMENTS'
  constructor (errors: any[]) {
    super('Invalid arguments provided', GQLArgValidationFailedError.code, { errors: errors })
  }
}
export class GQLError extends Error {
  public code: string
  constructor (message: string, code: string) {
    super(message)
    this.code = code
  }
}

export class NotEnoughGQLArguments extends ApolloError {
  constructor(message: string) {
      const code = 'NOT_ENOUGH_GQL_ARGUMENTS'
      super(message, code)
  }
}


export class NotObjectId extends ApolloError {
  constructor(message?: string) {
      const code = 'NOT_OBJECT_ID'
      super(message, code)
  }
}
