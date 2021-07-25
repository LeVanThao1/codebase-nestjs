import { ConfigService } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { AuthenticationError, ValidationError } from 'apollo-server-express'
import { GraphQLError } from 'graphql'
import { join } from 'path'
import { HEADER_TOKEN_KEY } from '../../constant'
import { AuthModule } from "../auth/auth.module";
import { AuthService } from "../auth/auth.service";
import { ConfigurationService } from '../config/config.service'
import { UserModule } from "../user/user.module";
import { UserService } from "../user/user.service";
import { PubSub } from 'graphql-subscriptions'

export const pubsub = new PubSub()

export default GraphQLModule.forRootAsync({
  imports: [UserModule, AuthModule],
  useFactory: async (userService: UserService, authService: AuthService, configService: ConfigurationService) => ({
    typePaths: ['./**/*.graphql'],
    definitions: {
      path: join(process.cwd(), 'src/schema.ts')
    },
    installSubscriptionHandlers: true,
    path: configService.getGQLEndpointPath(),
    bodyParserConfig: { limit: '50mb' },
    // cors:
    //   configService.getNodeEnv() === 'production'
    //     ? {
    //       origin: 'xxx',
    //       credentials: true // <-- REQUIRED backend setting
    //     }
    //     : true,
    playground: configService.getNodeEnv() !== 'production' && {
      settings: {
        'editor.cursorShape': 'underline', // possible values: 'line', 'block', 'underline'
        'editor.fontFamily': `'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace`,
        'editor.fontSize': 14,
        'editor.reuseHeaders': true, // new tab reuses headers from last tab
        'editor.theme': 'dark', // possible values: 'dark', 'light'
        'general.betaUpdates': true,
        'queryPlan.hideQueryPlanResponse': false,
        'request.credentials': 'include', // possible values: 'omit', 'include', 'same-origin'
        'tracing.hideTracingResponse': false
      }
    },
    subscriptions: {
      path: configService.getGQLEndpointPath(),
      keepAlive: 1000,
      onConnect: async (connectionParams) => {
        configService.getNodeEnv() !== 'production' &&
          console.debug(`🔗  Connected to websocket`, 'GraphQL')

        const token = connectionParams[HEADER_TOKEN_KEY]
        if (token) {
          const user = await authService.verifyToken(token)
          // permissions = await (await authService.findPermissionOfUser(user)).map(p => p.code) || []
          // ctxWithValue['currentUser'] = user
          return { currentAccount: user }

        }

        if (token) {
          const currentAccount = {}
          return { currentAccount }
        }

        throw new AuthenticationError(
          'Authentication token is invalid, please try again.'
        )
      },
      onDisconnect: () => {
        configService.getNodeEnv() !== 'production' &&
          console.error(`❌  Disconnected to websocket`, '', 'GraphQL', false)
      }
    },
    context: async ({ req: request }: { req: Request }, connection): Promise<any> => {
      if (connection) {
        const { currentAccount, permissions } = connection.context
        return {
          pubsub,
          currentAccount,
          permissions
        }
      }
      // QUERY-MUTATION
      let ctxWithValue = {}
      let permissions = null
      if (HEADER_TOKEN_KEY in request.headers) {
        try {
          const token = request.headers[HEADER_TOKEN_KEY]
          const user = await authService.verifyToken(token)
          if (!user) return { req: request, permissions, ...ctxWithValue }
          ctxWithValue['currentUser'] = user
        } catch (error) {
          console.log(error)
        }
      }
      return { req: request, pubsub, permissions, ...ctxWithValue }
    },
    // ERROR FORMAT CONFIGURATION - THIS IS CRUCIAL TO CHANGE, ASK YOUR LEADER BEFORE
    // MAKING ANY CHANGE
    formatError: (error: GraphQLError) => {
      // Handle validation errors passed from global exception filter (which originally emit from class validator)
      if (error.extensions.code === 'INVALID_ARGUMENTS') {
        return {
          message: error.message,
          code: error.extensions.code,
          details: error.extensions.errors.map(({ constraints, property }) => ({
            property,
            constraints
          }))
        }
      }
      // Handle throw or return ApolloError by user
      const graphQLFormattedError = {
        message: error.message,
        code:
          error.extensions?.code ||
          error.extensions?.exception?.code ||
          'UNKNOWN'
      }
      return graphQLFormattedError
    }
  }),
  inject: [UserService, AuthService, ConfigurationService]
})
