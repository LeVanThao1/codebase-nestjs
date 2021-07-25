import { ApolloError } from "apollo-server-express";

export class GQLUnauthenticatedError extends ApolloError {
    public static code = 'UNAUTHENTICATED'
    constructor(message?: string, code?: string) {
        super(message, code || GQLUnauthenticatedError.code)
    }
}

export class UnauthorizedError extends ApolloError {
    constructor(message: string) {
        const code = 'UNAUTHORIZED'
        super(message, code)
    }
}
