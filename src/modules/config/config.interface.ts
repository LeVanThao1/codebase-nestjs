export interface ConfigKeys {
    APP_PORT: number
    MONGO_URI: string
    DATABASE_USERNAME?: string
    DATABASE_PASSWORD?: string
    GRAPHQL_END?: string
    DATABASE_NAME?: string
    NODE_ENV?: string
    PASSWORD_HASH_SALT: number
    TOKEN_ENCRYPT_SECRET: string
}
